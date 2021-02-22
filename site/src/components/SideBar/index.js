import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import logo from 'assets/logo-theme.png';
import { useDispatch } from 'react-redux';
import { log_out } from 'g_actions/user';
import Dashboard from 'assets/icons/side-nav/dashboard';
import Courses from 'assets/icons/side-nav/courses';
import Settings from 'assets/icons/side-nav/setting';
import Logout from 'assets/icons/side-nav/logout.png';
import './style.scss';

const links = [
  {
    img: <Dashboard />,
    title: 'Dashboard',
    link: '/',
  },
  {
    img: <Courses />,
    title: 'Courses',
    link: '/courses',
  },
  // {
  //   img: files,
  //   title: 'My Files',
  //   link: '/files',
  // },
  {
    // img: faq,
    title: 'FAQs',
    link: '/faqs',
  },
  {
    img: <Settings />,
    title: 'Settings',
    link: '/settings',
  },
];

const adminlinks = [
  {
    img: <Dashboard />,
    title: 'Dashboard',
    link: '/admin',
  },
  {
    // img: student,
    title: 'Users',
    link: '/admin/users',
  },
  {
    img: <Courses />,
    title: 'Courses',
    link: '/admin/courses',
  },
  // {
  //   img: trainer,
  //   title: 'Trainers',
  //   link: '/admin/trainers',
  // },
  // {
  //   img: admin,
  //   title: 'Admin',
  //   link: '/admin/admins',
  // },
  {
    img: <Settings />,
    title: 'Settings',
    link: '/admin/settings',
  },
];

const uselink = {
  admin: adminlinks,
  reg: links,
};

const SideBard = ({ close, type = 'reg' }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = async (e) => {
    e.preventDefault();

    dispatch(log_out());
    history.push('/signin');
  };

  return (
    <div className="side_nav bg-white w-full h-full">
      <div className="flex relative flex-col justify-start z-0 w-full h-full pt-8">
        <div className="ml-8">
          <img
            key={user.profilePic}
            src={logo}
            alt=""
            className="w-16 object-contain"
          />
        </div>
        <div className="link-sec mt-10">
          {uselink[type].map((link, i) => (
            <NavLink
              exact={i === 0}
              to={`${link.link}`}
              activeClassName="__active"
              className="link-item flex justify-start items-center"
              key={`link_${i}`}
              onClick={close}
            >
              {link.img} {link.title}
            </NavLink>
          ))}

          <a
            href="/"
            onClick={logout}
            className="link-item flex justify-start items-center"
          >
            <img src={Logout} alt="logout" className="w-5 h-4 mr-3" />
            <span className="text-red-600">Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBard;
