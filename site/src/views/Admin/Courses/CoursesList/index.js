import React, { useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCurrentCourse, deleteCourse } from 'g_actions/admin';
import { useSelector } from 'react-redux';
import { axiosInstance } from 'helpers';
import DropDown from 'components/DropDown';
import Button from 'components/Button';
import Image from 'components/Image';
import 'react-sweet-progress/lib/style.css';
import './style.scss';

const CousreCard = ({ data }) => {
  const { id, thumbnail, name, CourseCohorts } = data;
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const el = useRef();

  const viewCohort = (e) => {
    e.preventDefault();

    dispatch(getCurrentCourse(data));
    push(`/admin/courses/${id}/cohorts`);
  };

  const deletecourse = async () => {
    try {
      el.current.classList.add('spinner1');
      await axiosInstance.delete(`/course/${data.id}`);

      el.current.classList.remove('spinner1');
      dispatch(deleteCourse(data));
    } catch (e) {
      el.current.classList.remove('spinner1');
      console.log(e);
      addToast('An error occured', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="p_cx_cd" ref={el} key={data.name}>
      <Link className="img-sec" to={''} onClick={viewCohort}>
        <Image image={thumbnail} imgClass="img cover" lazyLoad={true} />
      </Link>
      <div className="txt-sec">
        <div className="title_sec flex-row j-space">
          <h3 className="theme-color">{name}</h3>
          <DropDown>
            <ul>
              <li onClick={viewCohort}>View</li>
              <li
                onClick={() => {
                  dispatch(getCurrentCourse(data));
                  push(`/admin/courses/edit/${id}`);
                }}
              >
                Edit
              </li>
              <li onClick={deletecourse}>Delete</li>
            </ul>
          </DropDown>
        </div>

        <div className="chx flex-row j-space">
          <strong>{<p>{CourseCohorts.length} Cohorts</p>}</strong>
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  const allCourses = useSelector((state) => state.admin.allCourses);

  return (
    <div className="main flex-col cx_list_con j-start al-start">
      <div className="crx_nw flex-row j-end">
        <Button
          text="Create New Course"
          className="flex-row"
          link="/admin/courses/create"
        />
      </div>
      <section className="course_list">
        {allCourses.map((course, i) => (
          <CousreCard data={course} key={`enrolled_c_${i}`} />
        ))}
      </section>
    </div>
  );
};

export default CourseList;
