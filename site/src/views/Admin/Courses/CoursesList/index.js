import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCourses } from 'g_actions/courses';
import Loader from 'components/Loading';
import not_found from 'assets/not_found.png';
import Button from 'components/Button';
import CourseListSection from 'components/CourseListSection';
import Pagination from 'react-js-pagination';
import './style.scss';

const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!courses)
      (async () => {
        await dispatch(getAllCourses(page));
      })();

    return () => {};
  }, [dispatch, courses, page]);

  const paginate = async (num) => {
    window.scroll({
      behavior: 'auto',
      left: 0,
      top: 0,
    });
    setPage(num);

    // if (num <= propertyCount) return;

    await dispatch(getAllCourses(page));
  };

  return (
    <div className="main flex-col cx_list_con j-start al-start">
      {!courses ? (
        <Loader tempLoad={true} full={false} />
      ) : courses.length === 0 ? (
        <div className="nt_found img flex-col">
          <img src={not_found} alt="Not found" />
          <p className="text">There are no courses yet</p>
          <Button
            link="utiva.io"
            text="Create New Course"
            className="flex-row"
          />
        </div>
      ) : (
        <>
          <CourseListSection courses={courses} />
          <Pagination
            activePage={page}
            itemsCountPerPage={12}
            totalItemsCount={courses.paginationMeta.count}
            pageRangeDisplayed={5}
            onChange={(num) => paginate(num)}
          />
        </>
      )}
    </div>
  );
};

export default CourseList;
