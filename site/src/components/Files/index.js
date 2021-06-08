import React, { useState, useEffect, useRef } from 'react';
import no_file from 'assets/dashboard/no_file.png';
import Skeleton from 'react-skeleton-loader';
import FilesSec from './FileSec';
import Drag from '../Drag';
import Modal from 'components/Modal';
import Docs from 'components/DocViewer';
import './style.scss';

const Files = ({
  files,
  handleImage,
  deleteFile,
  showdrag = true,
  personal = false,
  children,
  linkExt,
  useErrorMessage = true,
  errorMsg,
  showOpt,
  viewgrade,
  key_name,
}) => {
  const [currentFile, setCurrentFile] = useState();
  const modalRef = useRef();

  useEffect(() => {
    if (currentFile) {
      modalRef.current.open();
    }
  }, [currentFile]);

  const close = (e) => {
    e && e.preventDefault();
    setCurrentFile(null);
    // modalRef.current.close()
  };

  return (
    <div className="info_con">
      <div className="info_con_sec scrolled flex-col al-start j-start">
        {!files ? (
          <div className="flex-col" style={{ width: '100%', height: '100%' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={`file_loader_${i}`}
                style={{
                  height: i === 1 ? '50px' : '10px',
                  width: '80%',
                  marginBottom: '5px',
                }}
              >
                <Skeleton width="100%" />
              </div>
            ))}
          </div>
        ) : files.length === 0 ? (
          useErrorMessage && (
            <div className="n_available flex-col img">
              <img src={no_file} alt="no classes" />
              <p className="txts">{errorMsg || 'You have no uploads'}</p>
            </div>
          )
        ) : (
          files.map((file, i) => (
            <FilesSec
              file={file}
              key={`d_files_${i}`}
              deleteFile={deleteFile}
              personal={personal}
              linkExt={linkExt}
              setCurrentFile={setCurrentFile}
              showOpt={showOpt}
              viewgrade={viewgrade}
            />
          ))
        )}
      </div>

      {showdrag && (
        <Drag
          key={new Date()}
          className="add_file"
          children={children}
          handleImage={handleImage}
        />
      )}

      <Modal ref={modalRef} runOnClose={close}>
        <Docs docs={currentFile} close={close} />
      </Modal>
    </div>
  );
};

export default Files;

//||(Array.isArray(files[0]) && files[0].length === 0)
