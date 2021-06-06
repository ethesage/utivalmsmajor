import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, useLocation, useHistory } from 'react-router-dom';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import PaymentComplete from 'components/CompletePayment';
// import ResourceBtn from 'components/ResourceButton';
import NavBar from 'components/CourseNav';
// import assignment from 'assets/icons/course/assignment.png';
import Layout from 'Layouts/SideNavListLayout';
import AddAssignment from '../AddAssignment';
import Title from 'components/Title';
import './style.scss';

function FullClass({ gapi }) {
  const { courseId, classroom } = useParams();
  const { pathname } = useLocation();
  const [editClass, setEditClass] = useState(false);
  const history = useHistory();
  const [addAssignment] = useState(pathname.includes('add-assignment'));
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { isStudent } = useSelector((state) => state.auth);

  GetCurrentCourse();

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

  // links={currentCourse.Course.Classes.map((classrm, i) => (
  //   <li key={`side_link_courses_${i}`}>
  //     <NavLink
  //       className="side_link"
  //       to={`/courses/classroom/${courseId}/${classrm.id}`}
  //       data-active={classroom === classrm.id}
  //     >
  //       {list_desc} {i + 1}
  //     </NavLink>
  //   </li>
  // ))}

  return (
    <>
      <Title text="Course" />
      <div className="cx_listnx_full flex-row al-start">
        {!currentCourse ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <div>
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
                    courseCohortId={currentCourse.CourseCohort.id}
                    editClass={() => setEditClass(!editClass)}
                    completedPayment={data && !(Object.keys(data).length === 3)}
                  />

                  <div className="prev_courses"></div>
                </>
              )}
              {addAssignment && (
                <>
                  <AddAssignment
                    title={data?.title}
                    course={currentCourse}
                    currentClass={data}
                    isStudent={isStudent}
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
          </div>
        )}
      </div>
    </>
  );
}
export default FullClass;
