import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { weeks } from '../../../helpers';
import play from '../../../assets/icons/course/play.png';
import material from '../../../assets/icons/course/material.png';
import assignment from '../../../assets/icons/course/assignment.png';
import class_icon from '../../../assets/icons/class_icon.png';
import ResourceBtn from '../../ResourceButton';
import RevielDrop from '../../RevielDrop';
import './style.scss';

function Classes({
  data,
  courseId,
  open = false,
  showArrow = true,
  full,
  index,
  link,
}) {
  const { title, description } = data;
  const { isTrainer } = useSelector((state) => state.auth);

  return (
    <div className="cx_listnx_con">
      <RevielDrop
        open={open}
        showArrow={showArrow}
        header={
          <div className="cx_header flex-row j-space">
            <h2 className={`h_con flex-row j-start ${full ? ' full' : ''}`}>
              <img src={class_icon} alt="class" />{' '}
              <span>
                Week {weeks[index + 1]} - {title}
              </span>
              {isTrainer && full ? (
                <Link
                  to={`/dashboard/courses/editClass/${data.id}`}
                  className="edit"
                >
                  Edit
                </Link>
              ) : null}
            </h2>
          </div>
        }
      >
        <div className={`cx_lis-content ${full ? ' full' : ''}`}>
          <div className="inf_x">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>

          <div className="btns">
            <div>
              <ResourceBtn
                img={play}
                text="Join Class"
                color="theme"
                link={link}
              />
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

          {!full ? (
            <Link
              className="view"
              to={`/dashboard/courses/classroom/${courseId}/${data.id}`}
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
