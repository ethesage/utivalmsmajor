import React from 'react';
import { NavLink, Switch, useRouteMatch } from 'react-router-dom';
import Layout from '../../components/SideNavListLayout';
import './style.scss';

const links = [
  {
    title: 'Profile',
    link: '',
  },
  {
    title: 'Password',
    link: '/reset-password',
  },
  {
    title: 'Notifications',
    link: '/notifications',
  },
];

const File_Page = () => {
  let { path } = useRouteMatch();

  return (
    <>
      <div className="dash-con files_ flex-col al-start j-start">
        <h2 style={{ marginBottom: '20px' }}>Settings</h2>
        <Layout
          subClassName="file_sec"
          links={links.map((info, i) => (
            <li key={`side_link_courses_${i}`}>
              <NavLink exact className="side_link" to={`/${path}/${info.link}`}>
                {info.title}
              </NavLink>
            </li>
          ))}
        >
          <Switch>
            {/* <Route exact path={`${path}`} component={AllFile} /> */}
            {/* <Route exact path={`${path}/folders`} component={Folders} /> */}
          </Switch>
        </Layout>
      </div>
    </>
  );
};

export default File_Page;
