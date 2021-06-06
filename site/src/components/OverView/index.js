import React from 'react';
import moment from 'moment';
import GetCurrentCourse from 'Hooks/getCurrentCourse';
import NavBar from '../CourseNav';
import Title from 'components/Title';
import { filterDate } from 'helpers';
import { LoaderSlim } from 'components/Loaders';

const Overview = () => {
  const [loading, error, currentCourse] = GetCurrentCourse();

  const dateData = {
    startDate: filterDate(currentCourse?.CourseCohort?.dateRange)?.startDate,
    endDate: filterDate(currentCourse?.CourseCohort?.dateRange)?.endDate,
  };

  return (
    <>
      <Title text="Course" />

      <NavBar currentCourse={currentCourse} />
      <section className="course-overview">
        {loading ? (
          <div>
            <div className="flex justify-center space-x-4 mb-6">
              <LoaderSlim height={5} width="1/2" />
              <LoaderSlim height={5} width="1/2" />
            </div>

            <LoaderSlim height={44} width="full" />
          </div>
        ) : error || currentCourse.length === 0 ? (
          <div>Course Not found</div>
        ) : (
          <>
            <div className="-m-3 flex flex-wrap">
              <div className="p-3 w-full sm:w-1/2 text-sm">
                <small className="text-theme">Course Title</small>
                <p className="bg-white p-3 mt-2 rounded-md">
                  {currentCourse.Course.name}
                </p>
              </div>
              <div className="p-3 w-full sm:w-1/2 text-sm">
                <small className="text-theme">Duration</small>
                <p className="bg-white p-3 mt-2 rounded-md">
                  Start:{' '}
                  <strong className="mr-4">
                    {moment(dateData?.startDate).format('MMM DD, YYYY')}
                  </strong>
                  End:{' '}
                  <strong>
                    {moment(dateData?.endDate).format('MMM DD, YYYY')}
                  </strong>
                </p>
              </div>
            </div>

            <div className="mt-16">
              <small className="text-theme">Course Description</small>

              <ol className="p-5 bg-white text-sm rounded-md min-h-xs mt-2 list-decimal pl-10">
                {currentCourse.Course.CourseDescriptions.map((classr, i) => (
                  <li className="list mb-4" key={`descriptors_${i}`}>
                    <h3>{classr.title}</h3>
                    <p>{classr.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Overview;
