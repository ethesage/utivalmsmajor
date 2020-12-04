import React from 'react';
import logo from 'assets/logo_white.png';
import fb from 'assets/icons/facebook.png';
import tw from 'assets/icons/twitter.png';
import yt from 'assets/icons/youtube.png';
import ig from 'assets/icons/instagram.png';
import md from 'assets/icons/medium.png';
import phone from 'assets/icons/phone.png';
import message from 'assets/icons/message.png';
import buildings from 'assets/layout/uildings.png';

import './style.scss';

const sc_links = [
  {
    img: tw,
    link: 'https://twitter.com/utiva_io',
  },
  {
    img: fb,
    link: 'https://web.facebook.com/utiva.io',
  },
  {
    img: ig,
    link: 'https://www.instagram.com/utiva.io/',
  },
  {
    img: yt,
    link: 'https://www.youtube.com/channel/UCivlnkHbCMhcrSGAQeQsOJw',
  },
  {
    img: md,
    link: 'https://medium.com/@utiva.io',
  },
];

const links = [
  { title: 'About Us', link: 'https://utiva.io/about', ext: true },
  { title: 'Why', link: 'https://utiva.io', ext: true },
  { title: 'Blog', link: 'https://utiva.io/blog', ext: true },
];

const extras = [
  { title: 'info@utiva.io', img: message, des: 'mailTo:' },
  { title: '08062111308', img: phone, des: 'tel:' },
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
                <a
                  key={`ft_sublink_${i}`}
                  href={link.link}
                  className="links"
                  target={link.ext ? '_' : null}
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="na_gt flex-col al-start">
              <h3>CONTACT US</h3>
              {extras.map((extra, i) => (
                <p key={`ft_sublink_${i}`} className="links flex-row">
                  <img src={extra.img} alt={extra.title} />
                  <a href={`${extra.des} ${extra.title}`}>{extra.title}</a>
                </p>
              ))}
            </div>
            <div className="na_gt flex-col al-start">
              <h3>FOLLOW US</h3>
              <div className="icons flex-row j-space">
                {sc_links.map((link, i) => (
                  <a href={link.link} key={`social_link_${i}`} target="_">
                    <img src={link.img} alt="" className="img contain" />
                  </a>
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
