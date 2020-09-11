import React from 'react';
import { NavLink, Switch, useRouteMatch, Route } from 'react-router-dom';
import Layout from '../../components/SideNavListLayout';
import Profile from '../Profile';
import Reset from '../Profile/PasswordReset';
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
      <div className="dash-con settings flex-col al-start j-start">
        <h2 style={{ marginBottom: '20px' }}>Settings</h2>
        <Layout
          subClassName="setting_sec"
          links={links.map((info, i) => (
            <li key={`side_link_courses_${i}`}>
              <NavLink exact className="side_link" to={`/settings${info.link}`}>
                {info.title}
              </NavLink>
            </li>
          ))}
        >
          <Switch>
            <Route exact path={`${path}`} component={Profile} />
            <Route exact path={`${path}/reset-password`} component={Reset} />
            {/* <Route exact path={`${path}/notifications`} component={Folders} /> */}
          </Switch>
        </Layout>
      </div>
    </>
  );
};

export default File_Page;
