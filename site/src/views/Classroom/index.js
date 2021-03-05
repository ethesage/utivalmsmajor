import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PaymentComplete from 'components/CompletePayment';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import useBreadcrumbs from 'Hooks/useBreadCrumbs';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import NavBar from 'components/CourseNav';
import './style.scss';

const Classroom = ({ full = false, gapi }) => {
  const { courseId } = useParams();
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const [openedRef, setOpenedRef] = useState();

  GetCurrentCourse();

  useBreadcrumbs(
    {
      name: currentCourse?.Course?.name,
      link: `/courses/classroom/${courseId}`,
    },
    !!currentCourse
  );

  return (
    <>
      <NavBar />
      <section className="cx_listnx img">
        {!currentCourse ? (
          <Loader tempLoad={true} full={false} />
        ) : (
          <>
            <div>
              {currentCourse.Course.Classes.map((class_room, i) => {
                {
                  console.log(
                    i < currentCourse.Course.Classes.length / 2
                      ? true
                      : currentCourse &&
                          (currentCourse.paymentComplete ||
                            null === currentCourse.paymentComplete)
                  );
                }
                return (
                  <Classes
                    key={`cx_listnx_${i}`}
                    trainers={``}
                    data={class_room}
                    courseId={courseId}
                    full={full}
                    index={i}
                    gapi={gapi}
                    openedRef={openedRef}
                    setOpenedRef={setOpenedRef}
                    folderId={currentCourse.CourseCohort.folderId}
                    completedPayment={
                      i < currentCourse.Course.Classes.length / 2
                        ? true
                        : currentCourse &&
                          (currentCourse.paymentComplete ||
                            null === currentCourse.paymentComplete)
                    }
                  />
                );
              })}
            </div>
            <PaymentComplete
              paymentComplete={
                currentCourse &&
                (currentCourse.paymentComplete ||
                  null === currentCourse.paymentComplete)
              }
              details={{
                ...currentCourse,
                courseCohort: [currentCourse.courseCohort],
                type: 'paid',
              }}
            />
          </>
        )}
      </section>
    </>
  );
};

export default Classroom;
