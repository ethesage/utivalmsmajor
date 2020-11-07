import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllsubmittedAssignment } from 'g_actions/member';
import { useDebounce } from 'use-debounce';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import moment from 'moment';
import Input from 'components/InputType';
import NavBar from 'components/CourseNav';
import T from 'components/Table';
import { stringSearch } from 'helpers';
import Button from 'components/Button';
import ViewGrade from 'components/ViewGrade';
import './style.scss';

const AllAssignmnets = ({ gapi }) => {
  const { courseId, classroom } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, classResources } = useSelector(
    (state) => state.member
  );
  const history = useHistory();
  const [classes, setClasses] = useState(currentCourse?.CourseCohort?.Classes);
  const [currentClass, setCurrentClass] = useState(classroom);
  const [loading, setLoading] = useState();
  const [filteredData, setFilteredData] = useState();
  const [filters, setFilters] = useState({
    type: 'reset',
    searchString: '',
  });
  const [searchQuery] = useDebounce(filters.searchString, 800);
  const [viewGrade, setViewGrade] = useState(false);
  const [currentSubmitted, setCurrentSubmitted] = useState();

  const currentClassdata = currentCourse?.CourseCohort?.Classes.filter(
    (class_) => class_.id === classroom
  );

  GetCurrentCourse();

  const getFiles = useCallback(
    async (id) => {
      if (!gapi) return;
      return await gapi.gapi.get(
        null,
        id,
        'id, name, iconLink, webContentLink, size, webViewLink, parents'
      );
    },
    [gapi]
  );

  useBreadcrumbs(
    [
      {
        name: currentCourse?.Course?.name,
        link: `/courses/classroom/${courseId}`,
      },
      {
        name: 'Assignments',
        link: `/courses/all-assignments/${courseId}/${classroom}`,
      },
    ],
    !!currentCourse
  );

  useEffect(() => {
    if (!currentCourse) return;
    if (classes) return;

    setClasses(currentCourse?.CourseCohort?.Classes);

    return () => {};
  }, [classes, currentCourse, history, courseId, classroom]);

  useEffect(() => {
    if (!currentCourse) return;
    if (!classes) return;
    if (classroom) return;
    // setCurrentClass();
    const classname = currentCourse?.CourseCohort?.Classes[0].id;
    history.push(`/courses/all-assignments/${courseId}/${classname}`);

    return () => {};
  }, [classes, currentCourse, history, courseId, classroom]);

  //get all submitted assignment for a user
  useEffect(() => {
    if (!classroom) return;
    if (!currentCourse) return;
    if (!currentClassdata) return;
    setCurrentClass(classroom);

    if (!classResources[currentClassdata[0].title].allSubmittedAssignment) {
      setLoading(true);
    } else setLoading(false);

    if (
      loading ||
      Array.isArray(
        classResources[currentClassdata[0].title].allSubmittedAssignment
      )
    )
      return;
    // console.log(currentClassdata[0], classroom);
    dispatch(getAllsubmittedAssignment(currentClassdata[0].title, classroom));

    return () => {};
  }, [
    classroom,
    currentCourse,
    dispatch,
    classResources,
    currentClassdata,
    loading,
  ]);

  useEffect(() => {
    if (!searchQuery) return;
    const data =
      classResources[currentClassdata[0].title].allSubmittedAssignment;
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
    history.push(`/courses/all-assignments/${courseId}/${value}`);
  };

  const Loader = () => (
    <div className="spinner1" style={{ height: '300px' }}></div>
  );

  if (
    !classes ||
    !currentClassdata?.length === 0 ||
    currentClass === '' ||
    loading ||
    !classroom
  ) {
    // if (true) {
    return (
      <>
        <NavBar />
        <section className="ass_ls">
          <div className="nav-sec flex-col al-start">
            <div className="nav-item">
              <Input
                inputs={listnameList || []}
                value={listnameList ? 'loading...' : currentClass}
                handleSelect={handleSelect}
                placeHolder="Select Class"
                label="Select class"
              />
            </div>
          </div>
          <Loader tempLoad />
        </section>
      </>
    );
  }

  const data = classResources[currentClassdata[0].title].allSubmittedAssignment;

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

    let file = await getFiles(assignment.resourceLink);

    setCurrentSubmitted({ ...assignment, file });
  };

  const viewAss = (e) => {
    e.preventDefault();

    if (!currentClass) return;
    if (!currentSubmitted) return;
    window.open(
      currentSubmitted.file.webViewLink || currentSubmitted.file.webContentLink
    );
  };

  // let assLink =
  //   currentClassdata[0].ClassResources[0] &&
  //   currentClassdata[0].ClassResources[0].link;

  // if (assLink) {
  //   (async () => {
  //     assLink = await getFiles(assLink);

  //     setAssFile(assLink);
  //   })();
  // }

  return (
    <>
      <NavBar />

      <section className="ass_ls">
        {!viewGrade ? (
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

            {loading || !data ? (
              <div className="spinner1" style={{ height: '300px' }}></div>
            ) : data.length === 0 ? (
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
                                src={assignment.User.profilePic}
                                alt={assignment.User.firstName}
                              />
                              <p>{`${assignment.User.firstName} ${assignment.User.lastName}`}</p>
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
        ) : !currentSubmitted ? (
          <Loader />
        ) : (
          <ViewGrade
            assignmentId={currentSubmitted.id}
            length={1}
            data={
              classResources[currentClassdata[0].title].allSubmittedAssignment
            }
            currentClass={currentClassdata}
            view={viewAss}
            goBack={() => setViewGrade(false)}
            name={listnameList.find((list) => list.value === currentClass).name}
            prevPath={`/courses/all-assignments/${courseId}/${classroom}`}
          />
        )}
      </section>
    </>
  );
};

export default AllAssignmnets;
