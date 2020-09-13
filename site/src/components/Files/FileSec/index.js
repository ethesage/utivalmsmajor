import React from 'react';
import { Link } from 'react-router-dom';
import delete_icon from '../../../assets/icons/delete.png';
import numeral from 'numeral';
import DropDown from '../../DropDown';
import './style.scss';

const FileSec = ({ file, personal = false, view, download, deleteFile }) => {
  return (
    <div className="file_card flex-row j-space">
      <div
        className="left flex-row j-start al-start"
        onClick={() => view(file.webViewLink)}
      >
        <img src={file.iconLink} alt="pdf" />
        <div className="txt-sec">
          <h2 className="clipped-text" style={{ '--number': 1 }}>
            {file.name}
          </h2>
          {personal ? (
            <>
              {file.isGraded ? (
                <small className="theme-color">Graded</small>
              ) : (
                <small className="theme-color">Not Graded</small>
              )}
            </>
          ) : (
            <small>{numeral(file.size).format('0b')}</small>
          )}
        </div>
      </div>

      {personal ? (
        <div>
          {file.isGraded ? (
            <Link
              to="/dashboard/courses/assignment/view_grade/3456"
              className="theme-color grade"
            >
              <small>View Grade</small>
            </Link>
          ) : (
            <img
              src={delete_icon}
              alt="delete"
              className="img_grade"
              onClick={() => deleteFile(file.id)}
            />
          )}
        </div>
      ) : (
        <DropDown>
          <ul>
            <li onClick={() => view(file.webViewLink)}>View</li>
            <li onClick={() => download(file.webContentLink)}>Download</li>
            {deleteFile && <li onClick={() => deleteFile(file.id)}>Delete</li>}
          </ul>
        </DropDown>
      )}
    </div>
  );
};

export default FileSec;
