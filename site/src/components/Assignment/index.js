import React from 'react';
import { useParams } from 'react-router-dom';
import ResourceBtn from '../ResourceButton';
import assignment from '../../assets/icons/course/assignment.png';
import FileSec from '../Files/FileSec';
import Button from '../Button';
import DropDown from '../DropDown';
import '../Classroom/Classes/style.scss';
import './style.scss';

const Assignment = () => {
  const { courseId, index } = useParams();

  return (
    <div className="asx cx_listnx_con flex-row j-start al-start">
      <div className="info_sec">
        <div className={`h_con ${!courseId ? ' full' : ''} full`}>
          <h2 className="cx_lis-header flex-row j-start">
            <span>Week one - SQL For Data</span>
          </h2>
        </div>
        <div className="cx_lis-content show full">
          <div className="inf_x">
            <h3>How to Query Data</h3>
            <p>
              The SQL class helps you learn how to use Structured Query Language
              (SQL) to extract and analyze data stored in databases. You’ll
              first learn to extractdata, join tables together, and perform
              aggregations. Then you’ll learn to do more complex analysis and
              manipulations using subqueries, temp tables, and window functions.
              By the end of the course, you’ll be able to write efficient SQL
              queries to successfullyhandle a variety of data analysis tasks.
              The Utiva trianing programmes works hard to help you transition to
              your dream jobs with the right skills from experience
              professionals
            </p>
          </div>
        </div>
        <div className="btn_sec_con flex-row j-start">
          <div className="btn_sec">
            <ResourceBtn
              img={assignment}
              text="Download Assignment"
              color="off"
              link=""
              handleClick={(e) => {
                e.preventDefault();
                console.log('clicked');
              }}
            />
          </div>
        </div>
      </div>

      <div className="upload">
        <h3>Your Assignments</h3>
        <div className="file_sec flex-col j-space al-start">
          <div className="files">
            <FileSec personal={true} />
          </div>

          <div className="drop-sec">
            <DropDown
              header={
                <div className="img-sec flex-row">
                  <Button className="u_btn flex-row mx-auto" text="Submit" />
                </div>
              }
            >
              <ul>
                <li>View</li>
                <li>Download</li>
                <li>Delete</li>
              </ul>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
