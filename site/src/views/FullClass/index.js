import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import Loader from 'components/Loading';
import Classes from 'components/Classes';
import PaymentComplete from 'components/CompletePayment';
import Title from 'components/Title';
import './style.scss';
import ArrowRight from 'assets/icons/ArrowRight';

function FullClass({ gapi }) {
  const { courseId, classroom } = useParams();
  const { pathname } = useLocation();
  const [editClass, setEditClass] = useState(false);
  const history = useHistory();
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { isStudent } = useSelector((state) => state.auth);

  const [loading] = GetCurrentCourse();

  let currentClassIndex;

  const data = currentCourse?.Course?.Classes.find((classrum, i) => {
    currentClassIndex = i;
    return classrum.id === classroom;
  });

  const nextClassData = currentCourse?.Course?.Classes[currentClassIndex + 1];

  return (
    <>
      <Title
        text="Course"
        loading={loading}
        sideEL={
          <Link
            to={`/courses/classroom/${courseId}/${nextClassData?.id}`}
            className="flex items-center text-theme font-semibold"
          >
            <span className="mr-5">Next</span>
            <span className="inline-block bg-theme rounded-full p-1.5">
              <ArrowRight className="w-4 h-4 fill-current text-white" />
            </span>
          </Link>
        }
      />

      {!currentCourse ? (
        <Loader tempLoad={true} full={false} />
      ) : (
        <div>
          <Classes
            data={data}
            open={true}
            showArrow={false}
            full={true}
            gapi={gapi}
            isStudent={isStudent}
            folderId={currentCourse && currentCourse.CourseCohort.folderId}
            courseId={courseId}
            addAssignment={() => {
              history.push(`${pathname}/add-assignment`);
            }}
            courseCohortId={currentCourse.CourseCohort.id}
            editClass={() => setEditClass(!editClass)}
            completedPayment={data && !(Object.keys(data).length === 3)}
          />

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
    </>
  );
}
export default FullClass;
