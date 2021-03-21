import React from 'react';
import { Link } from 'react-router-dom';
import delete_icon from 'assets/icons/delete.png';
import pdf from 'assets/file_icons/pdf.png';
import doc from 'assets/file_icons/doc.png';
import csv from 'assets/file_icons/csv.png';
import file_img from 'assets/file_icons/file.png';
import numeral from 'numeral';
import DropDown from '../../DropDown';
import './style.scss';
import { s3url } from 'helpers';

const FileSec = ({
  file,
  personal = false,
  deleteFile,
  linkExt,
  setCurrentFile,
  showOpt = true,
}) => {
  const view = async () => {
    setCurrentFile(`${s3url}/${file.Key}`);
  };

  const fileObj = {
    pdf,
    doc,
    docx: doc,
    csv,
    xls: csv,
    xlsx: csv,
  };

  const fileName = file.Key.split('/').pop();

  return (
    <div className="file_card">
      <div className="flex-row j-space">
        <div className="left flex-row j-start al-start" onClick={view}>
          <img src={fileObj[fileName.split('.')[1]] || file_img} alt="pdf" />
          <div className="txt-sec">
            <h2 className="clipped-text" style={{ '--number': 1 }}>
              {fileName}
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
              <small>{numeral(file.Size).format('0b')}</small>
            )}
          </div>
        </div>

        {showOpt &&
          (personal ? (
            <div>
              {file.isGraded ? (
                <Link
                  to={`/courses/assignment/${linkExt.courseId}/${linkExt.classroom}/${file.id}`}
                  className="theme-color grade"
                >
                  <small>View Grade</small>
                </Link>
              ) : (
                <img
                  src={delete_icon}
                  alt="delete"
                  className="img_grade"
                  onClick={() => deleteFile(file.Key)}
                />
              )}
            </div>
          ) : (
            <DropDown>
              <ul>
                <li onClick={view}>View</li>
                <li>
                  <a href={`${s3url}/${file.Key}`} download>
                    Download
                  </a>
                </li>
                {deleteFile && (
                  <li onClick={() => deleteFile(file.Key)}>Delete</li>
                )}
              </ul>
            </DropDown>
          ))}
      </div>
    </div>
  );
};

export default FileSec;
