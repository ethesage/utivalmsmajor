import React from 'react';
import { Link } from 'react-router-dom';
import play from '../../../assets/icons/course/play.png';
import material from '../../../assets/icons/course/material.png';
import assignment from '../../../assets/icons/course/assignment.png';
import class_icon from '../../../assets/icons/class_icon.png';
import ResourceBtn from '../../ResourceButton';
import RevielDrop from '../../RevielDrop';
import './style.scss';

function Classes({ data, i, courseId, open = false, showArrow = true }) {
  const { name } = data;

  return (
    <div className="cx_listnx_con" data-index={i}>
      <RevielDrop
        open={open}
        showArrow={showArrow}
        header={
          <div className="cx_header">
            <h2
              className={`h_con flex-row j-start ${!courseId ? ' full' : ''}`}
            >
              <img src={class_icon} alt="class" /> <span>{name}</span>
            </h2>
          </div>
        }
      >
        <div className={`cx_lis-content ${!courseId ? ' full' : ''}`}>
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

          <div className="btns">
            <div>
              <ResourceBtn img={play} text="Join Class" color="theme" />
            </div>
            <div className="reg_text">
              <h4>Resources</h4>
              <div className="btn_sec_con flex-row j-start">
                <div className="btn_sec">
                  <ResourceBtn
                    img={material}
                    text="Download Materials"
                    color="secondary"
                  />
                </div>
                <div className="btn_sec">
                  <ResourceBtn img={assignment} text="Assignment" color="off" />
                </div>
              </div>
            </div>
          </div>

          {!isNaN(i) ? (
            <Link
              className="view"
              to={`/dashboard/courses/classroom/full/${courseId}/week_${i}`}
            >
              View full outline
            </Link>
          ) : null}
        </div>
      </RevielDrop>
    </div>
  );
}
export default Classes;
