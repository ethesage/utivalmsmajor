import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, useLocation, useHistory } from 'react-router-dom';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import Nav from 'components/AdminHeader';
import NavBar from 'components/CourseNav';
import Layout from 'Layouts/SideNavListLayout';
import AddClass from 'views/AddClass';
import AddAssignment from '../../AddAssignment';
import '../style.scss';

function FullClass({ gapi }) {
  const { courseId, classroom, cohortId } = useParams();
  const { pathname } = useLocation();
  const [editClass, setEditClass] = useState(false);
  const history = useHistory();
  const [addAssignment] = useState(pathname.includes('add-assignment'));
  const [loading, error, currentCohort, currentCourse] = GetCurrentCohort();
  const { isStudent } = useSelector((state) => state.auth);
  const edit = pathname.includes('edit');

  // scroll the appropraite button clicked into view during a rerender
  useEffect(() => {
    const el = document.querySelector('.side_link[data-active="true"]');
    el && el.scrollIntoView(false);

    return () => {};
  }, [classroom, currentCourse]);

  const data = currentCohort?.Course?.Classes.find(
    (classrum) => classrum.id === classroom
  );

  if (error) {
    return (
      <div>
        <p>An Error Occured</p>
      </div>
    );
  }

  return (
    <>
      <Nav
        currentCohort={currentCohort}
        currentCourse={currentCourse}
        link={`/admin/courses/classroom/${courseId}/${cohortId}/add`}
        text={edit || !!addAssignment ? null : 'Add Class'}
      />
      <NavBar />
      <div className="cx_listnx_full flex-row al-start">
        {loading ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <Layout
            subClassName="fl-ass"
            links={currentCohort?.Course?.Classes.map((classrm, i) => (
              <li key={`side_link_courses_${i}`}>
                <NavLink
                  className="side_link"
                  to={`/admin/courses/classroom/${courseId}/${cohortId}/${classrm.id}`}
                  data-active={classroom === classrm.id}
                >
                  Day {i + 1}
                </NavLink>
              </li>
            ))}
          >
            <div className="flex-col j-start al-start img">
              {!edit && !addAssignment && (
                <>
                  <Classes
                    data={data}
                    open={true}
                    showArrow={false}
                    full={true}
                    gapi={gapi}
                    isStudent={isStudent}
                    currentCourse={currentCourse}
                    folderId={currentCohort?.folderId}
                    courseId={courseId}
                    addAssignment={() => {
                      history.push(`${pathname}/add-assignment`);
                    }}
                    editClass={() => setEditClass(!editClass)}
                    cohortId={cohortId}
                    completedPayment={true}
                    courseCohortId={currentCohort.id}
                  />

                  <div className="prev_courses"></div>
                </>
              )}

              {edit && (
                <AddClass
                  edit
                  editedClass={data}
                  name={currentCourse?.name}
                  courseId={courseId}
                  mainCohortId={currentCohort?.Cohort?.id}
                  key={data?.id}
                />
              )}

              {addAssignment && (
                <>
                  <AddAssignment
                    title={data?.title}
                    course={currentCohort}
                    currentClass={data}
                    gapi={gapi}
                    isStudent={isStudent}
                    folderId={currentCohort?.folderId}
                    key={data?.id}
                  />
                </>
              )}
            </div>
          </Layout>
        )}
      </div>
    </>
  );
}
export default FullClass;
