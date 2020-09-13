import React, { useEffect, useState, useRef } from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
  // useParams,
} from 'react-router-dom';
import Skeleton from 'react-skeleton-loader';
import ProgressBar from 'components/ProgressBar';
import Modal from 'components/Modal';
// import Button from 'components/Button';
import Files from 'components/Files';
// import Select from 'components/Select';
// import Layout from 'components/SideNavListLayout';
// import Input from 'components/Input';
// import Drag from 'components/Drag';
import Nav from 'components/InnerHeader';
import './style.scss';

// const links = [
//   {
//     title: 'All File',
//     link: '',
//   },
//   // {
//   //   title: 'Folders',
//   //   link: '/folders',
//   // },
// ];

const File_Page = ({ gapi }) => {
  const modalRef = useRef();

  let { path } = useRouteMatch();
  let [files, setFiles] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!gapi) return;
    if (!gapi.signedIn) return;

    const getFiles = async () => {
      const new_files = await gapi.gapi.get(
        '1F0r-bTgMLTkUhBf2o-ZTwtCPB3dWfnXp',
        null
      );
      setFiles(new_files.files);
    };

    getFiles();

    return () => {};
  }, [gapi]);

  const viewFile = async (contentLink) => {
    window.open(contentLink, '_blank');
  };

  const download = async (contentLink) => {
    window.open(contentLink);
  };

  const upload = async (files, folderId) => {
    modalRef.current.open();
    gapi.gapi.upload(files, setProgress, '1F0r-bTgMLTkUhBf2o-ZTwtCPB3dWfnXp');
  };

  const deleteFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
    gapi.gapi.deleteFile(id, 'name');
  };

  const AllFile = () => {
    return (
      <div className="upload_sec flex-row j-start al-start">
        <div className="file_con flex-col">
          {!files ? (
            [1, 2, 3].map((i) => (
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
            ))
          ) : (
            <Files
              files={files}
              view={viewFile}
              download={download}
              handleImage={upload}
              deleteFile={deleteFile}
            />
          )}
        </div>
      </div>
    );
  };

  // const Folders = () => {
  //   return (
  //     <div className="upload_sec flex-row j-start al-start">
  //       <div className="file_con">
  //         <Folder />
  //       </div>
  //       {/* <Button /> */}
  //     </div>
  //   );
  // };

  return (
    <>
      {/* <div className="search_file flex-row j-start">
        <p>Sort by</p>
        <Select inputs={[]} currentText="All type" />
        <Input placeHolder="Search File" />
      </div> */}

      <div className="dash-con files_ cx_listnx_full flex-col j-start al-start">
        <Nav>
          <h3>My Files</h3>
        </Nav>
        {/* <Layout
          subClassName="file_sec"
          // links={links.map((info, i) => (
          //   <li key={`side_link_courses_${i}`}>
          //     <NavLink exact className="side_link" to={`/files${info.link}`}>
          //       {info.title}
          //     </NavLink>
          //   </li>
          // ))}
        >
          <Switch>
            <Route exact path={`${path}`} component={AllFile} />
             <Route exact path={`${path}/folders`} component={Folders} /> 
          </Switch>
        </Layout> */}

        <div className="file_sec">
          <AllFile />
        </div>
      </div>
      <Modal ref={modalRef}>
        <ProgressBar progress={progress} />
      </Modal>
    </>
  );
};

export default File_Page;
