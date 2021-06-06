import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PaymentComplete from 'components/CompletePayment';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import NavBar from 'components/CourseNav';
import Title from 'components/Title';
import './style.scss';
import ClassData from 'components/ClassData';

const Classroom = () => {
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { user } = useSelector((state) => state.auth);
  const { courseId } = useParams();

  const [loading] = GetCurrentCourse();

  return (
    <>
      <Title text="Course" loading={loading} />
      <NavBar currentCourse={currentCourse} />
      <section className="max-w-5xl">
        {!currentCourse ? (
          <div>
            <Loader tempLoad={true} full={false} />
          </div>
        ) : (
          <>
            {currentCourse.Course.Classes.map((class_room, i) => {
              return (
                <ClassData
                  key={class_room.id}
                  data={class_room}
                  courseId={courseId}
                  currentCourse={currentCourse}
                  index={i}
                  completedPayment={
                    user.role === 'student'
                      ? i < currentCourse.Course.Classes.length / 2
                        ? true
                        : currentCourse &&
                          (currentCourse.paymentComplete ||
                            null === currentCourse.paymentComplete)
                      : //if its a trainer then true
                        true
                  }
                />
              );
            })}
            {user.role === 'student' && (
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
            )}
          </>
        )}
      </section>
    </>
  );
};

function Loader() {
  return (
    <div className="animate-pulse flex space-x-4 mb-10">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-white rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-36 bg-white rounded"></div>
          <div className="h-4 bg-white rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export default Classroom;
