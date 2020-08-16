import React from 'react';
// import no_file from "../../assets/dashboard/no_file.png";
import dots from '../../../assets/dashboard/dots.png';
import folder from '../../../assets/icons/folder.png';
import FilesSec from '../FileSec';
import DropDown from '../../DropDown';
import RevielDrop from '../../RevielDrop';
import './style.scss';

const Files = () => {
  return (
    <div className="file_folders info_con scrolled flex-col al-start j-space">
      <div className="file_sec">
        <div className="sx_flder">
          <RevielDrop
            showArrow={false}
            className=" folder-head flex-row j-space"
            header={
              <div>
                <h2 className="flex-row">
                  <img src={folder} alt="folder" />
                  <p className="clipped-text" style={{ '--number': 1 }}>
                    Data Analytics Folder
                  </p>
                </h2>

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
              </div>
            }
          >
            <div className="files_con">
              <FilesSec />
              <FilesSec />
              <FilesSec />
            </div>
          </RevielDrop>
        </div>

        <div className="sx_flder">
          <RevielDrop
            showArrow={false}
            className=" folder-head flex-row j-space"
            header={
              <div>
                <h2 className="flex-row">
                  <img src={folder} alt="folder" />
                  <p className="clipped-text" style={{ '--number': 1 }}>
                    Data Analytics Folder
                  </p>
                </h2>

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
              </div>
            }
          >
            <div className="files_con">
              <FilesSec />
              <FilesSec />
              <FilesSec />
            </div>
          </RevielDrop>
        </div>
      </div>
    </div>
  );
};

export default Files;
