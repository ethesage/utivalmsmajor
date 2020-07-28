import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import dash from "../../assets/icons/side-nav/dash.png";
import course from "../../assets/icons/side-nav/course.png";
import files from "../../assets/icons/side-nav/files.png";
import faq from "../../assets/icons/side-nav/faq.png";
import settings from "../../assets/icons/side-nav/settings.png";
import user_icon from "../../assets/user_icon.png";
import "./style.scss";

const links = [
  {
    img: dash,
    title: "Dashboard",
    link: "",
  },
  {
    img: course,
    title: "Courses",
    link: "/courses",
  },
  {
    img: files,
    title: "My Files",
    link: "/files",
  },
  {
    img: faq,
    title: "FAQs",
    link: "/faqs",
  },
  {
    img: settings,
    title: "Settings",
    link: "/settings",
  },
];

const SideBard = ({ url }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="side_nav">
      <div className="contents flex-col al-start j-start">
        <div className="profile_pic flex-col">
          <div className="img-sec">
            <img
              src={(user && user.profilePic) || user_icon}
              alt=""
              className="img cover"
            />
          </div>
          <p>{user && `${user.firstName} ${user.lastName}`}</p>
        </div>
        <div className="link-sec">
          {links.map((link, i) => (
            <NavLink
              exact={i === 0}
              to={`${url}${link.link}`}
              activeClassName="__active"
              className="link-item flex-row j-start"
              key={`link_${i}`}
            >
              <img src={link.img} alt={link.title} /> <p>{link.title}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBard;
