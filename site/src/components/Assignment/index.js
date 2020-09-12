import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResourceBtn from '../ResourceButton';
import Classes from '../Classroom/Classes';
import assignment from 'assets/icons/course/assignment.png';
import { getEnrolledCourses } from 'g_actions/student';
import Loader from '../Loading';
import Files from 'components/Files';
import { getAssignments } from 'g_actions/student';
import Button from '../Button';
import DropDown from '../DropDown';
import '../Classroom/Classes/style.scss';
import './style.scss';

const Assignment = ({ gapi }) => {
  const { courseId, classroom } = useParams();
  const [assLink, setAssLink] = useState();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.student.enrolledcourses);
  const currentCourse = useSelector((state) => state.student.currentCourse);
  const { classResources } = useSelector((state) => state.student);

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

  const currentClass =
    currentCourse &&
    currentCourse.CourseCohort.Classes.find(
      (classrum) => classrum.id === classroom
    );

  const download = async (e) => {
    e.preventDefault();

    if (!currentClass) return;
    if (!classResources[currentClass.title].assignment) return;
    window.open(
      classResources[currentClass.title].assignment.webContentLink ||
        classResources[currentClass.title].assignment.webViewLink
    );
  };

  return (
    <div className="asx flex-row j-start al-start">
      {currentCourse ? (
        <>
          <div className="asx_sec">
            <Classes
              data={currentClass}
              open={true}
              showArrow={false}
              full={true}
              showResources={false}
              gapi={gapi}
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
