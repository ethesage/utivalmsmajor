import React from 'react';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import { useLocation, Link } from 'react-router-dom';
import Loader from 'components/Loading';
import Nav from 'components/InnerHeader';
import Edit from './Edit';
import '../style.scss';
import './style.scss';

const Overview = () => {
  const [loading, error, currentCohort, currentCourse] = GetCurrentCohort();
  const { pathname } = useLocation();
  const edit = pathname.includes('edit') || pathname.includes('create');

  return (
    <>
      <Nav>
        <h3>
          {currentCourse && currentCohort
            ? `${currentCourse.name} ${currentCohort?.Cohort.cohort} Cohort`
            : ''}
        </h3>
      </Nav>
      <section className="cx_ovx ad">
        {loading ? (
          <Loader tempLoad={true} full={false} />
        ) : error ? (
          <div>Course Not found</div>
        ) : (
          <>
            {!edit ? (
              <div className="info_sec _text">
                <div className="info">
                  <div className="nv flex-row j-space">
                    <h2>Course Brief</h2>{' '}
                    <Link to={`${pathname}/edit`}>
                      <p className="edit">Edit</p>
                    </Link>
                  </div>
                  <p>{currentCohort?.Course?.description}</p>
                </div>

                <div className="list_info">
                  <h2>What Student Will Learn</h2>
                  {currentCohort?.Course?.CourseDescriptions.map(
                    (classr, i) => (
                      <div className="list" key={`descriptors_${i}`}>
                        <span className="flex-row">
                          <p>{i + 1}</p>
                        </span>
                        <h3>{classr.title}</h3>
                        <p>{classr.description}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Edit
                descrip={currentCohort?.Course?.CourseDescriptions}
                courseName={currentCourse?.name}
              />
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Overview;
