import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResourceBtn from '../ResourceButton';
import Classes from '../Classroom/Classes';
import assignment from 'assets/icons/course/assignment.png';
import { getEnrolledCourses } from 'g_actions/student';
import Loader from '../Loading';
import Files from 'components/Files';
import Button from '../Button';
import DropDown from '../DropDown';
import '../Classroom/Classes/style.scss';
import './style.scss';

const Assignment = ({ gapi: { gapi, signedIn } }) => {
  const { courseId, classroom } = useParams();
  const [assLink, setAssLink] = useState();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.student.enrolledcourses);
  const currentCourse = useSelector((state) => state.student.currentCourse);

  useEffect(() => {
    if (!enrolledcourses && !currentCourse)
      (async () => {
        await dispatch(getEnrolledCourses(courseId));
      })();

    return () => {};
  }, [dispatch, enrolledcourses, courseId, currentCourse]);

  useEffect(() => {
    if (!enrolledcourses) return;
    if (currentCourse) return;

    dispatch(
      getEnrolledCourses(
        courseId,
        enrolledcourses &&
          enrolledcourses.find((course) => course.id === courseId)
      )
    );

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch]);

  useEffect(() => {
    if (assLink) return;
    (async () => {
      if (!signedIn) return;
      const link = await gapi.get(
        '',
        '15mktW3ZOICxNOqrMSYIwzx8tD8TF2RQH',
        'webContentLink'
      );

      setAssLink(link);
    })();
  }, [gapi, signedIn, assLink]);

  const download = async () => {
    if (!assLink) return;
    window.open(assLink.webContentLink);
  };

  return (
    <div className="asx flex-row j-start al-start">
      {currentCourse ? (
        <>
          <div className="asx_sec">
            <Classes
              data={currentCourse.CourseCohort.Classes.find(
                (classrum) => classrum.id === classroom
              )}
              open={true}
              showArrow={false}
              full={true}
              showResources={false}
            />
            <div className="btn_sec_con flex-row j-start">
              <div className="btn_sec">
                <ResourceBtn
                  img={assignment}
                  text="Download Assignment"
                  color="off"
                  link=""
                  handleClick={download}
                />
              </div>
            </div>
          </div>

          <div className="upload">
            <h3>Your Assignments</h3>
            <Files
              files={[]}
              // view={viewFile}
              personal={true}
              download={download}
              showdrag={false}
            />
          </div>
        </>
      ) : (
        <div className="flex-row img">
          <Loader tempLoad={true} full={false} />
        </div>
      )}
    </div>
  );
};

export default Assignment;
