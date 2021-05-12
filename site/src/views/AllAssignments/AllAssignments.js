import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllsubmittedAssignment } from 'g_actions/member';
import { useDebounce } from 'use-debounce';
import moment from 'moment';
import Input from 'components/InputType';
import T from 'components/Table';
import { stringSearch } from 'helpers';
import Button from 'components/Button';
import user_icon from 'assets/user_icon.png';
import ViewGrade from 'components/ViewGrade';
import './style.scss';

const AllAssignmnets = ({ currentCourse, isAdmin, cohortId }) => {
  const { courseId, classroom } = useParams();
  const dispatch = useDispatch();
  const { classResources } = useSelector((state) => state.member);
  const history = useHistory();
  const [classes, setClasses] = useState(currentCourse?.CourseCohort?.Classes);
  const [currentClass, setCurrentClass] = useState(classroom);
  // const [loading, setLoading] = useState();
  const [filteredData, setFilteredData] = useState();
  const [filters, setFilters] = useState({
    type: 'reset',
    searchString: '',
  });
  const [searchQuery] = useDebounce(filters.searchString, 800);
  const [viewGrade, setViewGrade] = useState(false);
  const [currentSubmitted, setCurrentSubmitted] = useState();

  const classesToUse = currentCourse?.Course?.Classes;

  const currentClassdata = classesToUse?.filter(
    (class_) => class_.id === classroom
  );

  const data =
    currentClassdata &&
    classResources[currentClassdata[0]?.title]?.allSubmittedAssignment;

  useEffect(() => {
    if (!currentCourse) return;
    if (classes) return;

    setClasses(classesToUse);

    return () => {};
  }, [classes, currentCourse, history, courseId, classroom, classesToUse]);

  useEffect(() => {
    if (!classroom) return;
    if (!currentCourse) return;
    if (!currentClassdata) return;
    if (data) return;

    setCurrentClass(classroom);

    const s_cohort_id = cohortId || currentCourse.CourseCohort.id;

    (async () => {
      await dispatch(
        getAllsubmittedAssignment(
          currentClassdata[0].title,
          classroom,
          s_cohort_id,
          currentCourse.Course.name,
          currentCourse.Cohort.cohort
        )
      );
    })();

    return () => {};
  }, [
    classroom,
    currentCourse,
    dispatch,
    classResources,
    currentClassdata,
    cohortId,
    data,
  ]);

  useEffect(() => {
    if (!searchQuery) return;
    if (!data) return;

    const searchResult = data.filter(
      (s_data) =>
        stringSearch(searchQuery, s_data.User.firstName) ||
        stringSearch(searchQuery, s_data.User.lastName)
    );

    searchQuery.length > 0
      ? setFilteredData(searchResult)
      : setFilteredData(null);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const listnameList = classes?.map((class_) => ({
    name: class_.title,
    value: class_.id,
  }));

  const handleSelect = ({ target: { value } }) => {
    setCurrentClass(value);
    history.push(
      isAdmin
        ? `/admin/courses/all-assignments/${courseId}/${cohortId}/${value}`
        : `/courses/all-assignments/${courseId}/${value}`
    );
  };

  const Loader = () => (
    <div className="spinner1" style={{ height: '300px' }}></div>
  );

  if (!classes || !currentClassdata?.length === 0 || currentClass === '') {
    // if (true) {
    return (
      <>
        <section className="ass_ls">
          <div className="nav-sec flex-col al-start">
            <div className="nav-item">
              {listnameList ? (
                <Input
                  inputs={listnameList || []}
                  value={currentClass}
                  handleSelect={handleSelect}
                  placeHolder="Select Class"
                  label="Select class"
                  itype="select"
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <Loader tempLoad />
        </section>
      </>
    );
  }

  const updateInput = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const setFilter = ({ target: { name, value } }) => {
    if (value && value !== 'reset' && value !== '') {
      const temp = data.filter(
        (s_data) => s_data.isGraded === (value === 'graded')
      );

      updateInput(name, value);
      setFilteredData(temp);
    } else setFilteredData(null);
  };

  const grade = async (assignment) => {
    setViewGrade(true);
    setCurrentSubmitted(null);

    setCurrentSubmitted(assignment);
  };

  return (
    <>
      <section className="ass_ls">
        {!viewGrade && (
          <>
            <div className="nav-sec flex-col al-start">
              <div className="nav-item">
                <Input
                  inputs={listnameList || []}
                  value={currentClass}
                  handleSelect={handleSelect}
                  placeHolder="Select Class"
                  label="Select class"
                  itype="select"
                />
              </div>

              <div className="nav-item flex-row j-start">
                <div className="inner flex-row j-start">
                  <p className="label">Type</p>
                  <Input
                    inputs={[
                      { name: 'All', value: 'reset' },
                      { name: 'Graded', value: 'graded' },
                      { name: 'Ungraded', value: 'ungraded' },
                    ]}
                    value={filters.type}
                    handleSelect={setFilter}
                    itype="select"
                    name="type"
                  />
                </div>

                <Input
                  value={filters.searchString}
                  handleChange={({ target: { name, value } }) =>
                    updateInput(name, value)
                  }
                  name="searchString"
                  shouldValidate={false}
                  placeHolder="Search"
                />
              </div>
            </div>

            {classroom && !data && (
              <div className="spinner1" style={{ height: '300px' }}></div>
            )}

            {!classroom && (
              <div className="flex-row" style={{ height: '300px' }}>
                <p>Please select a class</p>
              </div>
            )}

            {!data || data?.length === 0 ? (
              <div className="flex-row" style={{ height: '300px' }}>
                <p>No Submitted Assignments Yet</p>
              </div>
            ) : (
              <T.Table keys={['Name', 'Submission Date', 'Grade', '']}>
                {({ keys }) => (
                  <T.Body keys={keys}>
                    {(filteredData || data).map((assignment, i) => (
                      <T.Trow
                        key={`mkeys_${i}`}
                        values={{
                          Name: (
                            <div className="usr-img flex-row j-start">
                              <img
                                src={assignment?.User?.profilePic || user_icon}
                                alt={assignment?.User?.firstName}
                                onError={(e) => (e.target.src = user_icon)}
                              />
                              <p>{`${assignment?.User?.firstName} ${assignment?.User?.lastName}`}</p>
                            </div>
                          ),
                          'Submission Date': moment(
                            assignment.submitDate
                          ).format('DD-MM-YYYY'),
                          Grade: assignment.grade || 0,
                          'Grade Now': 'yes',
                          '': (
                            <Button
                              className="td-cls flex-row"
                              text={assignment.grade ? 'View grade' : 'Grade'}
                              onClick={() => grade(assignment)}
                            />
                          ),
                        }}
                      />
                    ))}
                  </T.Body>
                )}
              </T.Table>
            )}
          </>
        )}

        {viewGrade && (
          <ViewGrade
            assignmentId={currentSubmitted.id}
            length={1}
            data={currentSubmitted}
            currentClass={currentClassdata}
            goBack={() => setViewGrade(false)}
            name={listnameList.find((list) => list.value === currentClass).name}
            prevPath={
              isAdmin
                ? `/admin/courses/all-assignments/${courseId}/${cohortId}/${classroom}`
                : `/courses/all-assignments/${courseId}/${classroom}`
            }
          />
        )}
      </section>
    </>
  );
};

export default AllAssignmnets;
