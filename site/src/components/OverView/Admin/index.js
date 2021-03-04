import React, { useState } from 'react';
import GetCurrentCohort from 'Hooks/getCurrentCohort';
import Loader from 'components/Loading';
import Nav from 'components/AdminHeader';
import NavBar from '../../CourseNav';
import Edit from './Edit';
import '../style.scss';
import './style.scss';

const Overview = () => {
  const [loading, error, currentCohort, currentCourse] = GetCurrentCohort();
  const [createNew, setCreateNew] = useState(false);
  // console.log(currentCohort, currentCourse);

  return (
    <>
      <Nav currentCohort={currentCohort} currentCourse={currentCourse} />

      <NavBar />
      <section className="cx_ovx ad">
        {loading ? (
          <Loader tempLoad={true} full={false} />
        ) : error ? (
          <div>Course Not found</div>
        ) : (
          <>
            <div className="info_sec _text">
              <div className="info">
                <div className="nv flex-row j-space">
                  <h2>Course Brief</h2>
                  <p className="edit" onClick={() => setCreateNew(true)}>
                    Add New
                  </p>
                </div>
                <p>{currentCohort?.Course?.description}</p>
              </div>

              {/* <div className="list_info">
                <h2>What Student Will Learn</h2>
                {currentCohort?.Course?.CourseDescriptions.map((classr, i) => (
                  <div className="list" key={`descriptors_${i}`}>
                    <span className="flex-row">
                      <p>{i + 1}</p>
                    </span>
                    <h3>{classr.title}</h3>
                    <p>{classr.description}</p>
                  </div>
                ))}
              </div> */}

              <Edit
                descrip={currentCohort?.Course?.CourseDescriptions || []}
                courseName={currentCourse?.name}
                open={createNew}
                setOpen={setCreateNew}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Overview;
