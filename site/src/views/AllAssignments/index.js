import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEnrolledCourses,
  getAllsubmittedAssignment,
} from 'g_actions/member';
import Select from 'components/Select';
import NavBar from 'components/CourseNav';
import './style.scss';

const AllAssignmnets = () => {
  const { courseId, classroom } = useParams();
  const dispatch = useDispatch();
  const { currentCourse, enrolledcourses } = useSelector(
    (state) => state.member
  );
  const history = useHistory();
  const [classes, setClasses] = useState(null);
  const [currentClass, setCurrentClass] = useState('');

  useEffect(() => {
    if (currentCourse) return;

    const course = enrolledcourses.find(
      (course) => course.courseCohortId === courseId
    );

    dispatch(getEnrolledCourses(courseId, course, 'trainer'));

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch]);

  useEffect(() => {
    if (!currentCourse) return;
    if (classes) return;

    setClasses(currentCourse?.CourseCohort?.Classes);

    return () => {};
  }, [classes, currentCourse, history, courseId, classroom]);

  useEffect(() => {
    if (!currentCourse) return;
    if (!classes) return;
    if (classroom) return;
    // setCurrentClass();
    const classname = currentCourse?.CourseCohort?.Classes[0].id;
    history.push(`/courses/all-assignments/${courseId}/${classname}`);

    return () => {};
  }, [classes, currentCourse, history, courseId, classroom]);

  //get all submitted assignment for a user
  useEffect(() => {
    if (!classroom) return;
    if (!currentCourse) return;
    setCurrentClass(classroom);

    const currentClassdata = currentCourse.CourseCohort.Classes.filter(
      (class_) => class_.id === classroom
    );

    console.log(currentClassdata[0]);
    dispatch(getAllsubmittedAssignment(classroom));

    return () => {};
  }, [classroom, currentCourse, dispatch]);

  const listnameList = classes?.map((class_) => ({
    name: class_.title,
    value: class_.id,
  }));

  const handleSelect = ({ target: { value } }) => {
    setCurrentClass(value);
    history.push(`/courses/all-assignments/${courseId}/${value}`);
  };

  // console.log(listnameList, currentClass);

  return (
    <>
      <NavBar />
      {!classes ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Select
            inputs={listnameList || []}
            value={currentClass}
            handleSelect={handleSelect}
            placeHolder="Select Class"
          />
        </div>
      )}
      <section className="ass_ls"></section>
    </>
  );
};

export default AllAssignmnets;
