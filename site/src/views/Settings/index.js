import React from 'react';
import { NavLink, Switch, useRouteMatch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../../Layouts/SideNavListLayout';
import Profile from '../Profile';
import Reset from '../Profile/PasswordReset';
import './style.scss';

const File_Page = () => {
  let { path } = useRouteMatch();
  const { isAdmin } = useSelector((state) => state.auth);

  const links = [
    {
      title: 'Profile',
      link: isAdmin ? '/admin/settings' : '/settings',
    },
    {
      title: 'Password',
      link: isAdmin ? '/admin/settings/reset-password' : '/reset-password',
    },
    // {
    //   title: 'Notifications',
    //   link: isAdmin ? ' ' : 'notifications',
    // },
  ];

  return (
    <section className="dash-con settings flex-col al-start j-start">
      <h2 style={{ marginBottom: '20px' }}>Settings</h2>
      <Layout
        subClassName="setting_sec"
        links={links.map((info, i) => (
          <li key={`side_link_courses_${i}`}>
            <NavLink exact className="side_link" to={`${info.link}`}>
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
    </section>
  );
};

export default File_Page;
