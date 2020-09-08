import React, { useEffect, useState } from 'react';
import {
  NavLink,
  Route,
  Switch,
  useRouteMatch,
  // useParams,
} from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar';
import Modal from '../../components/Modal';
// import Button from '../../components/Button';
import Files from '../../components/Files';
import Folder from '../../components/Files/Folder';
import Select from '../../components/Select';
import Layout from '../../components/SideNavListLayout';
import Input from '../../components/Input';
import Drag from '../../components/Drag';
import './style.scss';

const links = [
  {
    title: 'All File',
    link: '',
  },
  {
    title: 'Folders',
    link: '/folders',
  },
];

const File_Page = ({ gapi }) => {
  // const { signedIn, gapi } = gapi;

  let { path } = useRouteMatch();
  let [files, setFiles] = useState();
  const [progress, setProgress] = useState(0);

  const getImage = (img) => {
    console.log(img);
  };

  useEffect(() => {
    console.log(gapi);
    if (!gapi) return;
    if (!gapi.signedIn) return;

    const getFiles = async () => {
      const new_files = await gapi.gapi.get();
      setFiles(new_files);
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

  const upload = async (files) => {
    gapi.gapi.upload(files);
  };

  const deleteFile = () => {
    gapi.gapi.deleteFile();
  };

  const AllFile = () => {
    return (
      <div className="upload_sec flex-row j-start al-start">
        <div className="file_con">
          {files && (
            <Files
              files={files}
              view={viewFile}
              download={download}
              handleImage={upload}
            />
          )}
        </div>
        <div className="drag_upload flex-row">
          <Drag handleImage={upload} />
        </div>
      </div>
    );
  };

  const Folders = () => {
    return (
      <div className="upload_sec flex-row j-start al-start">
        <div className="file_con">
          <Folder />
        </div>
        {/* <Button /> */}
      </div>
    );
  };

  return (
    <>
      <div className="search_file flex-row j-start">
        <p>Sort by</p>
        <Select inputs={[]} currentText="All type" />
        <Input placeHolder="Search File" />
      </div>
      <div className="dash-con files_ cx_listnx_full flex-row j-start al-start">
        <Layout
          subClassName="file_sec"
          links={links.map((info, i) => (
            <li key={`side_link_courses_${i}`}>
              <NavLink exact className="side_link" to={`/files${info.link}`}>
                {info.title}
              </NavLink>
            </li>
          ))}
        >
          <Switch>
            <Route exact path={`${path}`} component={AllFile} />
            <Route exact path={`${path}/folders`} component={Folders} />
          </Switch>
        </Layout>
      </div>
      <Modal>
        <ProgressBar progress={0} />
      </Modal>
    </>
  );
};

export default File_Page;
