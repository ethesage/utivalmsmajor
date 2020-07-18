import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import fb from "../../../assets/icons/facebook.png";
import tw from "../../../assets/icons/twitter.png";
import yt from "../../../assets/icons/youtube.png";
import ig from "../../../assets/icons/instagram.png";
import md from "../../../assets/icons/medium.png";
import phone from "../../../assets/icons/phone.png";
import message from "../../../assets/icons/message.png";
import buildings from "../../../assets/layout/uildings.png";

import "./style.scss";

const sc_links = [
  {
    img: tw,
    link: "",
  },
  {
    img: fb,
    link: "",
  },
  {
    img: ig,
    link: "",
  },
  {
    img: yt,
    link: "",
  },
  {
    img: md,
    link: "",
  },
];

const links = [
  { title: "About Us", link: "/about" },
  { title: "Why", link: "/whyus" },
  { title: "Blog", link: "#" },
];

const extras = [
  { title: "info@utiva.io", img: message },
  { title: "+1 (202) 931-9842", img: phone },
];

const Footer = () => {
  return (
    <>
      <img src={buildings} alt="" className="buildings" />
      <section className="ft_sx  flex-col">
        <div className="ft_con container flex-col">
          <div className="contents flex-row card j-space al-start">
            <div className="logo">
              <img src={logo} alt="" className="img contain" />
            </div>
            <div className="na_gt flex-col al-start">
              <h3>MENU</h3>
              {links.map((link, i) => (
                <Link key={`ft_sublink_${i}`} to={link.link} className="links">
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="na_gt flex-col al-start">
              <h3>CONTACT US</h3>
              {extras.map((extra, i) => (
                <p key={`ft_sublink_${i}`} className="links flex-row">
                  <img src={extra.img} alt={extra.title} />
                  {extra.title}
                </p>
              ))}
            </div>
            <div className="na_gt flex-col al-start">
              <h3>FOLLOW US</h3>
              <div className="icons flex-row j-space">
                {sc_links.map((link, i) => (
                  <Link to={link.link} key={`social_link_${i}`}>
                    <img src={link.img} alt="" className="img contain" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="reserved flex-row">
            <p>&copy; {new Date().getFullYear()} Utiva. All right reserved</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
