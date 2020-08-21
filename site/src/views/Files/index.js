import React from 'react';
import {
  NavLink,
  Route,
  Switch,
  useRouteMatch,
  // useParams,
} from 'react-router-dom';
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
  // {
  //   title: 'UPload',
  //   link: '/upload',
  // },
  {
    title: 'Folders',
    link: '/folders',
  },
];

const File_Page = () => {
  let { path } = useRouteMatch();

  const getImage = (img) => {
    console.log(img);
  };

  const AllFile = () => {
    return (
      <div className="upload_sec flex-row j-start al-start">
        <div className="file_con">
          <Files />
        </div>
        <div className="drag_upload flex-row">
          <Drag handleImage={getImage} />
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
