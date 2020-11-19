import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sekeleton from 'react-skeleton-loader';
import { getEnrolledMembers } from 'g_actions/member';
import MemberCard from 'components/Member';

// import
import './style.scss';

const Members = ({ courseId }) => {
  const dispatch = useDispatch();
  const { enrolledStudents } = useSelector((state) => state.member);

  useEffect(() => {
    if (!courseId) return;
    if (!enrolledStudents) {
      (async () => {
        await dispatch(getEnrolledMembers(courseId));
      })();
    }
    return () => {};
  }, [enrolledStudents, dispatch, courseId]);

  const Loader = () => (
    <div className="snx_mem">
      <Sekeleton width="120%" height="100%" />
    </div>
  );

  const NoClass = () => <div>No members enrolled yet</div>;

  return (
    <>
      <section className="members">
        <h3>{enrolledStudents && enrolledStudents.length} Total Members</h3>

        <div className="memx_sec">
          {!enrolledStudents ? (
            [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
          ) : enrolledStudents.length === 0 ? (
            <NoClass />
          ) : (
            enrolledStudents.map((students, i) => (
              <MemberCard key={`enrolled_students_${i}`} data={students} />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Members;
