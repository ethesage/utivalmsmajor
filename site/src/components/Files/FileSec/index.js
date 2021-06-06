import { useRef } from 'react';
import { Link } from 'react-router-dom';
import delete_icon from 'assets/icons/delete.png';
import pdf from 'assets/file_icons/pdf.png';
import doc from 'assets/file_icons/doc.png';
import csv from 'assets/file_icons/csv.png';
import file_img from 'assets/file_icons/file.png';
import numeral from 'numeral';
import DropDown from '../../DropDown';
import Modal from 'components/Modal';
import Confirm from 'components/Confirm';
import { s3url } from 'helpers';

const FileSec = ({
  file,
  personal = false,
  deleteFile,
  linkExt,
  setCurrentFile,
  showOpt = true,
  isStudent,
}) => {
  const view = async () => {
    setCurrentFile(`${s3url}/${file.Key}`);
  };

  const deleteDialog = useRef();

  const fileObj = {
    pdf,
    doc,
    docx: doc,
    csv,
    xls: csv,
    xlsx: csv,
  };

  const fileName = file.Key.split('/').pop();

  const deleteThisFIle = () => {
    deleteFile(file.Key);
  };

  const openDelete = () => {
    deleteDialog.current.open();
  };

  return (
    <div className="flex items-center justify-between w-full cursor-pointer">
      <div className="flex-center" onClick={view}>
        <img
          className="w-7 h-7 mr-3"
          src={fileObj[fileName.split('.')[1]] || file_img}
          alt="pdf"
        />
        <div className="text-xs">
          <h2 className="clipped-text" style={{ '--number': 1 }}>
            {fileName} - {numeral(file.Size).format('0b')}
          </h2>
        </div>
      </div>

      {showOpt && (
        <div className="ml-5">
          {personal ? (
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
                  onClick={openDelete}
                />
              )}
            </div>
          ) : (
            !isStudent && (
              <DropDown>
                <ul>
                  <li onClick={view}>View</li>
                  <li>
                    <a
                      href={`${s3url}/${encodeURIComponent(file.Key)}`}
                      download
                    >
                      Download
                    </a>
                  </li>
                  <li onClick={openDelete}>Delete</li>
                </ul>
              </DropDown>
            )
          )}
        </div>
      )}

      <Modal ref={deleteDialog}>
        <Confirm
          text="Are you sure?"
          onClick={deleteThisFIle}
          close={() => deleteDialog.current.close()}
          closeText="Successfuly Deleted"
        />
      </Modal>
    </div>
  );
};

export default FileSec;
