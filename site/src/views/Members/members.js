import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sekeleton from 'react-skeleton-loader';
import { getEnrolledMembers, enrollStudents } from 'g_actions/member';
import useFetch from 'Hooks/useFetch';
import { getAllStudents } from 'g_actions/student';
import MemberCard from 'components/Member';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import user_icon from 'assets/user_icon.png';
import Close from 'assets/icons/closeX';
import { stringSearch } from 'helpers';
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

    // inner_modalRef.current.classList.remove('spinner1');

    //add axios call to add students here

    dispatch(
      enrollStudents(
        students.map((student) => ({ courseCohortId: courseId, User: student }))
      )
    );
    setStudents([]);
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
  const usersToshow = filtered.length > 0 ? filtered : allStudents;

  return (
    <>
      <section className="members">
        <nav className="nav_sec flex-row j-space">
          <h3>{loading && enrolledStudents?.members.length} Total Members</h3>

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

        <div className="memx_sec">
          {loading ? (
            [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
          ) : enrolledStudents.members.length === 0 ? (
            <NoClass />
          ) : (
            enrolledStudents?.members.map((students, i) => (
              <MemberCard key={`enrolled_students_${i}`} data={students} />
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

            {students.length > 0 && (
              <strong style={{ marginBottom: '10px', cursor: 'pointer' }}>
                <small className="theme-color" onClick={removeAll}>
                  Remove All
                </small>
              </strong>
            )}

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

            {students.length > 0 && (
              <strong
                style={{
                  marginBottom: '10px',
                  marginTop: '-20px',
                  cursor: 'pointer',
                }}
              >
                <small className="theme-color" onClick={enroll}>
                  Enroll Students
                </small>
              </strong>
            )}

            <h2>Results</h2>
            {!s_loading ? (
              <div className="trx_con">
                {usersToshow?.length === 0 && (
                  <p>No trainers on the platform yet</p>
                )}
                {usersToshow?.map((student) => (
                  <div
                    key={student.id}
                    className="trainer flex-row j-start"
                    onClick={() => addStudent(student)}
                  >
                    <img
                      src={student.profilePic || user_icon}
                      alt="userimage"
                      onError={handleImgError}
                    />
                    <div>
                      <strong>
                        <p>
                          {student.firstName} {student.lastName}
                        </p>
                      </strong>
                      <small>{student.occupation}</small>
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
