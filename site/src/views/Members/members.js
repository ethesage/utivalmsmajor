import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sekeleton from 'react-skeleton-loader';
import {
  getEnrolledMembers,
  enrollStudents,
  deleteStudent,
} from 'g_actions/member';
import useFetch from 'Hooks/useFetch';
import { getAllStudents } from 'g_actions/student';
import MemberCard from 'components/Member';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import user_icon from 'assets/user_icon.png';
import Close from 'assets/icons/closeX';
import { stringSearch, axiosInstance } from 'helpers';
import './style.scss';

const Members = ({ courseId }) => {
  const dispatch = useDispatch();
  const { enrolledStudents } = useSelector((state) => state.member);
  const { isAdmin } = useSelector((state) => state.auth);
  const allStudents = useSelector((state) => state.students);
  const modalRef = useRef();
  const inner_modalRef = useRef();
  const course = enrolledStudents?.courseId === courseId && !!enrolledStudents;
  const [filtered, setFiltered] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, , fetch] = useFetch(dispatch, !course);
  const [students, setStudents] = useState([]);
  const [s_loading, , s_fetch] = useFetch(dispatch, !!!allStudents);

  useEffect(() => {
    if (allStudents) return;

    s_fetch(() => getAllStudents());

    return () => {};
  }, [s_fetch, dispatch, allStudents]);

  useEffect(() => {
    if (!courseId) return;
    if (loading) {
      fetch(() => getEnrolledMembers(courseId));
    }
    return () => {};
  }, [loading, fetch, courseId]);

  const Loader = () => (
    <div className="snx_mem">
      <Sekeleton width="120%" height="100%" />
    </div>
  );

  const NoClass = () => <div>No members enrolled yet</div>;

  const handleImgError = (e) => {
    e.target.src = user_icon;
  };

  const removeAll = () => {
    setStudents([]);
  };

  const enroll = async () => {
    inner_modalRef.current.classList.add('spinner1');

    try {
      await axiosInstance.post(`/checkout/quickcheckout/${courseId}`, {
        insertUser: students.map((student) => ({ studentId: student.id })),
      });

      dispatch(
        enrollStudents(
          students.map((student) => ({
            courseCohortId: courseId,
            User: student,
          }))
        )
      );
      setStudents([]);
      modalRef.current.close();

      inner_modalRef.current.classList.remove('spinner1');
    } catch (err) {
      inner_modalRef.current.classList.remove('spinner1');
      return;
    }
  };

  const remove = (id) => {
    setStudents((state) => state.filter((student) => student.id !== id));
  };

  const addStudent = (data) => {
    const enrolled = enrolledStudents?.members.find(
      (student) => student.User.id === data.id
    );
    const selected = students.find((student) => student.id === data.id);

    if (enrolled || selected) return;

    setStudents([...students, data]);
  };

  const handleSearch = ({ target: { name, value } }) => {
    if (value !== '') {
      const searchResult = allStudents.filter(
        ({ firstName, lastName, email }) =>
          stringSearch(value, firstName) ||
          stringSearch(value, lastName) ||
          stringSearch(value, email)
      );
      setFiltered(searchResult);
    } else {
      setFiltered([]);
    }
  };

  const handleMembersSearch = ({ target: { name, value } }) => {
    if (value !== '') {
      const searchResult = enrolledStudents.members.filter(
        ({ User: { firstName, lastName, email } }) =>
          stringSearch(value, firstName) ||
          stringSearch(value, lastName) ||
          stringSearch(value, email)
      );

      setFilteredMembers(searchResult);
    } else {
      setFilteredMembers([]);
    }
  };

  const removeStudentFromCourse = async (id) => {
    document.querySelector('body').classList.add('spinner3');

    try {
      await axiosInstance.patch(`/admin/delete-student`, {
        courseCohortId: courseId,
        studentId: id,
      });

      setFilteredMembers([]);
      dispatch(deleteStudent(id));
      document.querySelector('body').classList.remove('spinner3');
    } catch (err) {
      document.querySelector('body').classList.remove('spinner3');
    }
  };

  const usersToshow = filtered.length > 0 ? filtered : allStudents;
  const membersToshow =
    filteredMembers.length > 0 ? filteredMembers : enrolledStudents?.members;

  return (
    <>
      <section className="members">
        <nav className="nav_sec flex-row j-space">
          <h3>{!loading && enrolledStudents?.members.length} Total Members</h3>

          {isAdmin && (
            <Button
              text="Add Student"
              onClick={() => {
                modalRef.current.open();
              }}
              className="flex-row"
            />
          )}
        </nav>

        <div style={{ marginTop: '30px', maxWidth: '300px' }}>
          <Input
            placeHolder="Search by name or email"
            name="search"
            handleChange={handleMembersSearch}
          />
        </div>

        <div className="memx_sec">
          {loading ? (
            [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
          ) : enrolledStudents.members.length === 0 ? (
            <NoClass />
          ) : (
            membersToshow.map((student, i) => (
              <MemberCard
                key={`enrolled_students_${i}`}
                data={student}
                isAdmin={isAdmin}
                onClick={() => removeStudentFromCourse(student.User.id)}
              />
            ))
          )}
        </div>

        <Modal ref={modalRef}>
          <div
            className="choose_usr flex-col j-start al-start"
            ref={inner_modalRef}
          >
            <p
              className="close"
              onClick={() => {
                modalRef.current.close();
              }}
            >
              Close
            </p>
            <Input
              placeHolder="Search by name or email"
              name="search"
              handleChange={handleSearch}
            />

            <div className="flex-row img j-space">
              {students.length > 0 && (
                <>
                  <strong
                    style={{
                      marginBottom: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    <small className="theme-color" onClick={enroll}>
                      Enroll Students
                    </small>
                  </strong>

                  <strong style={{ marginBottom: '10px', cursor: 'pointer' }}>
                    <small className="theme-color" onClick={removeAll}>
                      Remove All
                    </small>
                  </strong>
                </>
              )}
            </div>

            <div className="selected flex-row j-start">
              {students.map((student, i) => (
                <div className="slx_tr" key={`students_add_${i}`}>
                  <img
                    src={student?.profilePic || user_icon}
                    alt=""
                    onError={handleImgError}
                  />
                  <div
                    className="rmv flex-row"
                    onClick={() => remove(student.id)}
                  >
                    <Close />
                  </div>
                </div>
              ))}
            </div>

            <h2>Results</h2>
            {!s_loading ? (
              <div className="trx_con">
                {usersToshow?.length === 0 && (
                  <p>No trainers on the platform yet</p>
                )}
                {usersToshow?.map((student) => (
                  <div
                    key={student?.id}
                    className="trainer flex-row j-start"
                    onClick={() => addStudent(student)}
                  >
                    <img
                      src={student?.profilePic || user_icon}
                      alt="userimage"
                      onError={handleImgError}
                    />
                    <div>
                      <strong>
                        <p>
                          {student?.firstName} {student?.lastName}
                        </p>
                      </strong>
                      <small>{student?.occupation}</small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="spinner2"
                style={{ height: '100px', width: '100%' }}
              ></div>
            )}
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Members;
