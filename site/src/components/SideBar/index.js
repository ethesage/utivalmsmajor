import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import dash from 'assets/icons/side-nav/dash.png';
import course from 'assets/icons/side-nav/course.png';
import student from 'assets/icons/side-nav/student.png';
// import trainer from 'assets/icons/side-nav/trainer.png';
// import admin from 'assets/icons/side-nav/admin.png';
// import files from 'assets/icons/side-nav/files.png';
import faq from 'assets/icons/side-nav/faq.png';
import settings from 'assets/icons/side-nav/settings.png';
import settings1 from 'assets/icons/side-nav/settings-1.png';
import logo from 'assets/logo-theme.png';

import Dashboard from 'assets/icons/side-nav/dashboard';
import './style.scss';

const links = [
  {
    img: <Dashboard />,
    title: 'Dashboard',
    link: '/',
  },
  {
    // img: course,
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
    // img: settings1,
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
    // img: course,
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
    // img: settings,
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

  return (
    <div className="side_nav bg-white w-full h-full">
      <div className="flex relative flex-col justify-start z-0 w-full h-full pt-8">
        <div className="">
          <img
            key={user.profilePic}
            src={logo}
            alt=""
            className="w-20 object-contain"
          />
        </div>
        <div className="link-sec">
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
        </div>
      </div>
    </div>
  );
};

export default SideBard;
