import React from 'react';
// import no_file from "../../assets/dashboard/no_file.png";
import FilesSec from './FileSec';
import Drag from '../Drag';
import './style.scss';

const Files = ({ files, view, download, handleImage }) => {
  return (
    <div className="info_con scrolled flex-col al-start j-space">
      <div className="file_sec">
        {files.files.map((file, i) => (
          <FilesSec
            file={file}
            key={`d_files_${i}`}
            view={view}
            download={download}
          />
        ))}
      </div>

      {/* <div className="n_available flex-col"
        <img src={no_file} alt="no classes" />
        <p className="txts">You have no files yet</p>
      </div> */}
      <Drag className="add_file" handleImage={handleImage} />
    </div>
  );
};

export default Files;
