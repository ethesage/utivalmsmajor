import React from 'react';
import { Link } from 'react-router-dom';
import pdf from '../../../assets/dashboard/pdf.png';
import delete_icon from '../../../assets/icons/delete.png';
// import word from "../../../assets/dashboard/word.png";
// import excel from "../../../assets/dashboard/excel.png";
// import video from "../../../assets/dashboard/video.png";
import dots from '../../../assets/dashboard/dots.png';
import DropDown from '../../DropDown';
import './style.scss';

const FileSec = ({ personal = false }) => {
  return (
    <div className="file_card flex-row j-space">
      <div className="left flex-row j-start">
        <img src={pdf} alt="pdf" />
        <div className="txt-sec">
          <h2 className="clipped-text" style={{ '--number': 1 }}>
            HR Analytics Fundamentals
          </h2>
          {personal ? (
            <small className="theme-color">Graded</small>
          ) : (
            <small>10MB</small>
          )}
        </div>
      </div>

      {personal ? (
        <div>
          {true ? (
            <Link
              to="/dashboard/courses/assignment/view_grade/3456"
              className="theme-color grade"
            >
              <small>View Grade</small>
            </Link>
          ) : (
            <img src={delete_icon} alt="delete" className="img_grade" />
          )}
        </div>
      ) : (
        <DropDown
          header={
            <div className="img-sec flex-row">
              <img src={dots} alt="dots" className="img contain" />
            </div>
          }
        >
          <ul>
            <li>View</li>
            <li>Download</li>
            <li>Delete</li>
          </ul>
        </DropDown>
      )}
    </div>
  );
};

export default FileSec;
