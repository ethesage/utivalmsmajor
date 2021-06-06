import { useState } from 'react';
import no_file from 'assets/dashboard/no_file.png';
import FilesSec from './FileSec';
import Drag from '../Drag';
import Docs from 'components/DocViewer';
import { LoaderSlim } from 'components/Loaders';

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
  isStudent,
}) => {
  const [currentFile, setCurrentFile] = useState();

  const close = (e) => {
    e && e.preventDefault();
    setCurrentFile(null);
  };

  return (
    <div className="">
      {!files ? (
        <div className="flex-col" style={{ width: '100%', height: '100%' }}>
          <LoaderSlim height={20} width="full" />
          <LoaderSlim height={4} width="3/4" />
          <LoaderSlim height={3} width="1/2" />
        </div>
      ) : files.length === 0 ? (
        useErrorMessage && (
          <div className="flex-center flex-col">
            <img src={no_file} alt="no classes" />
            <p className="mt-3">{errorMsg || 'You have no uploads'}</p>
          </div>
        )
      ) : (
        <div className="-m-3">
          <div className="flex flex-wrap">
            {files.map((file, i) => (
              <div className="p-3" key={file.id}>
                <FilesSec
                  file={file}
                  key={`d_files_${i}`}
                  deleteFile={deleteFile}
                  personal={personal}
                  linkExt={linkExt}
                  setCurrentFile={setCurrentFile}
                  showOpt={showOpt}
                  viewgrade={viewgrade}
                  isStudent={isStudent}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showdrag && (
        <Drag
          key={new Date()}
          className="add_file"
          children={children}
          handleImage={handleImage}
        />
      )}

      {currentFile && <Docs docs={currentFile} close={close} />}
    </div>
  );
};

export default Files;

//||(Array.isArray(files[0]) && files[0].length === 0)
