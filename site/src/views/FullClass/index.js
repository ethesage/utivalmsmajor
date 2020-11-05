import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useLocation, useHistory } from 'react-router-dom';
import { getEnrolledCourses } from 'g_actions/member';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import ResourceBtn from 'components/ResourceButton';
// import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import NavBar from 'components/CourseNav';
import assignment from 'assets/icons/course/assignment.png';
import Layout from 'Layouts/SideNavListLayout';
import AddAssignment from '../AddAssignment';
import './style.scss';

function FullClass({ gapi }) {
  const { courseId, classroom } = useParams();
  const { pathname } = useLocation();
  const [editClass, setEditClass] = useState(false);
  const history = useHistory();
  const [addAssignment] = useState(pathname.includes('add-assignment'));

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { isStudent } = useSelector((state) => state.auth);
  const userType = isStudent ? 'student' : 'trainer';

  // useBreadcrumbs(
  //   currentCourse && {
  //     name: currentCourse.Course.name,
  //     link: `/courses/classroom/${courseId}/${classroom}`,
  //   }
  // );

  // scroll the appropraite button clicked into view during a rerender
  useEffect(() => {
    const el = document.querySelector('.side_link[data-active="true"]');
    el && el.scrollIntoView(false);

    return () => {};
  }, [classroom, currentCourse]);

  useEffect(() => {
    if (currentCourse) return;

    const course = enrolledcourses.find(
      (course) => course.courseCohortId === courseId
    );

    dispatch(getEnrolledCourses(courseId, course, userType));

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch, userType]);

  // const onclick = (id) => {};

  const data = currentCourse?.CourseCohort?.Classes.find(
    (classrum) => classrum.id === classroom
  );

  const ass = data?.ClassResources.filter((res) => res.type === 'assignment');

  return (
    <>
      <NavBar />
      <div className="cx_listnx_full flex-row al-start">
        {!currentCourse ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <Layout
            subClassName="fl-ass"
            links={currentCourse.CourseCohort.Classes.map((classrm, i) => (
              <li key={`side_link_courses_${i}`}>
                <NavLink
                  className="side_link"
                  to={`/courses/classroom/${courseId}/${classrm.id}`}
                  data-active={classroom === classrm.id}
                >
                  Week {i + 1}
                </NavLink>
              </li>
            ))}
          >
            <div className="flex-col j-start al-start img">
              {!addAssignment && (
                <>
                  <Classes
                    data={data}
                    open={true}
                    showArrow={false}
                    full={true}
                    gapi={gapi}
                    isStudent={isStudent}
                    folderId={
                      currentCourse && currentCourse.CourseCohort.folderId
                    }
                    courseId={courseId}
                    addAssignment={() => {
                      history.push(`${pathname}/add-assignment`);
                    }}
                    editClass={() => setEditClass(!editClass)}
                  />
                  {isStudent && ass.length > 0 && (
                    <div className="btns">
                      <div className="reg_text">
                        <h4>Activities</h4>
                        <div className="btn_sec_con flex-row j-start">
                          <div className="btn_sec">
                            <ResourceBtn
                              img={assignment}
                              text="Submit Assignment"
                              color="approved"
                              link={`/courses/assignment/${courseId}/${classroom}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="prev_courses"></div>
                </>
              )}
              {addAssignment && (
                <>
                  <AddAssignment
                    title={data?.title}
                    course={currentCourse}
                    currentClass={data}
                    gapi={gapi}
                    isStudent={isStudent}
                    folderId={currentCourse?.CourseCohort?.folderId}
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