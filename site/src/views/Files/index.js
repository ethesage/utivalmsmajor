import React, { useEffect, useState } from 'react';
import {
  NavLink,
  Route,
  Switch,
  useRouteMatch,
  // useParams,
} from 'react-router-dom';
import axios from 'axios';
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

const File_Page = ({ gapi: { signedIn, gapi } }) => {
  let { path } = useRouteMatch();
  let [files, setFiles] = useState();

  const getImage = (img) => {
    console.log(img);
  };

  useEffect(() => {
    if (!signedIn) return;

    const getFiles = async () => {
      const new_files = await gapi.get();
      setFiles(new_files);
    };

    getFiles();

    return () => {};
  }, [signedIn, gapi]);

  const viewFile = async (contentLink) => {
    window.open(contentLink, '_blank');
  };

  const download = async (contentLink) => {
    window.open(contentLink);
  };

  const upload = async (files) => {
    gapi.upload(files);
    // const access = await gapi.api.auth.getToken();

    // if (access) {
    //   const config = {
    //     onUploadProgress: function (progressEvent) {
    //       var percentCompleted = Math.round(
    //         (progressEvent.loaded * 100) / progressEvent.total
    //       );
    //       console.log(percentCompleted);
    //     },
    //     headers: {
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //   };

    //   let data = new FormData();
    //   data.append('media', files[0]);

    //   axios
    //     .post(
    //       `https://www.googleapis.com/upload/drive/v3/files?uploadType=media&scope=${access.scope}&access_token=${access.access_token}`,
    //       data,
    //       config
    //     )
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // }
  };

  const deleteFile = () => {
    gapi.deleteFile();
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
              <NavLink
                exact
                className="side_link"
                to={`/dashboard/files${info.link}`}
              >
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
    </>
  );
};

export default File_Page;
