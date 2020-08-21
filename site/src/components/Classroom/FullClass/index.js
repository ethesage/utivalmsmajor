import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Classes from '../Classes';
import ResourceBtn from '../../ResourceButton';
import NavBar from '../../CourseNav';
import assignment from '../../../assets/icons/course/assignment.png';
import Layout from '../../SideNavListLayout';
import './style.scss';

const _data = [
  {
    id: 1,
    title: 'Jude',
    name: 'Week one - SQL For Data',
  },
  {
    id: 2,
    title: 'Jude violet',
    name: 'Week Two - SQL For Data',
  },
  {
    id: 3,
    title: 'Jude chinoso',
    name: 'Week Three - SQL For Data',
  },
  {
    id: 4,
    title: 'Jude okuwanyi',
    name: 'Week Four - SQL For Data',
  },
];

function FullClass({ data = _data }) {
  const { courseId, index } = useParams();
  const [currentCourse, setCurrentCourse] = useState(index.split('_')[1]);

  useEffect(() => {
    setCurrentCourse(index.split('_')[1]);

    return () => {};
  }, [index]);

  return (
    <>
      <NavBar />
      <div className="cx_listnx_full">
        <Layout
          links={data.map((unused, i) => (
            <li>
              <NavLink
                className="side_link"
                to={`/dashboard/courses/classroom/${courseId}/week_${i}`}
                key={`side_link_courses_${i}`}
              >
                Week {i + 1}
              </NavLink>
            </li>
          ))}
        >
          <Classes
            data={data[currentCourse]}
            open={true}
            showArrow={false}
            full={true}
          />
          <div className="btns">
            <div className="reg_text">
              <h4>Activities</h4>
              <div className="btn_sec_con flex-row j-start">
                <div className="btn_sec">
                  <ResourceBtn
                    img={assignment}
                    text="Submit Assignment"
                    color="approved"
                    link={`/dashboard/courses/assignment/${courseId}/${index}`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="prev_courses"></div>
        </Layout>
      </div>
    </>
  );
}
export default FullClass;
