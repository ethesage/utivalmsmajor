import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, useLocation, useHistory } from 'react-router-dom';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import PaymentComplete from 'components/CompletePayment';
// import ResourceBtn from 'components/ResourceButton';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import NavBar from 'components/CourseNav';
// import assignment from 'assets/icons/course/assignment.png';
import Layout from 'Layouts/SideNavListLayout';
import AddAssignment from '../AddAssignment';
import './style.scss';

function FullClass({ gapi }) {
  const { courseId, classroom } = useParams();
  const { pathname } = useLocation();
  const [editClass, setEditClass] = useState(false);
  const history = useHistory();
  const [addAssignment] = useState(pathname.includes('add-assignment'));
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { isStudent } = useSelector((state) => state.auth);

  const curWeek = currentCourse?.Course?.Classes?.find(
    (classr) => classr.id === classroom
  );

  GetCurrentCourse();

  useBreadcrumbs(
    addAssignment
      ? null
      : [
          {
            name: currentCourse?.Course?.name,
            link: `/courses/classroom/${courseId}`,
          },
          {
            name: `${curWeek?.title}`,
            link: `/courses/classroom/${courseId}/${classroom}`,
          },
        ],
    !!currentCourse
  );

  const list_desc =
    currentCourse?.list_desc || currentCourse?.Course?.list_desc;

  // scroll the appropraite button clicked into view during a rerender
  useEffect(() => {
    const el = document.querySelector('.side_link[data-active="true"]');
    el && el.scrollIntoView(false);

    return () => {};
  }, [classroom, currentCourse]);

  const data = currentCourse?.Course?.Classes.find(
    (classrum) => classrum.id === classroom
  );

  // const ass = data?.ClassResources.filter((res) => res.type === 'assignment');

  return (
    <>
      <NavBar />
      <div className="cx_listnx_full flex-row al-start">
        {!currentCourse ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <Layout
            subClassName="fl-ass"
            links={currentCourse.Course.Classes.map((classrm, i) => (
              <li key={`side_link_courses_${i}`}>
                <NavLink
                  className="side_link"
                  to={`/courses/classroom/${courseId}/${classrm.id}`}
                  data-active={classroom === classrm.id}
                >
                  {list_desc} {i + 1}
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
                  {/* {isStudent && ass.length > 0 && (
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
                  )} */}
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

            <PaymentComplete
              paymentComplete={data && !(Object.keys(data).length === 3)}
              details={{
                ...currentCourse,
                courseCohort: [currentCourse.courseCohort],
                type: 'paid',
              }}
              full
            />
          </Layout>
        )}
      </div>
    </>
  );
}
export default FullClass;
