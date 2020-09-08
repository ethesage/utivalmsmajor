import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import data from '../../data/faqs';
import RevielDrop from '../../components/RevielDrop';
import Layout from '../../components/SideNavListLayout';
import './style.scss';

const FAQ = () => {
  const { info } = useParams();
  const [currentSection, setCurrentection] = useState(
    info === '' || !info ? 'general' : info
  );

  useEffect(() => {
    setCurrentection(info === '' || !info ? 'general' : info);
    return () => {};
  }, [info]);

  const newdata = {
    general: data[0],
    lectures: data[1],
    certificate: data[2],
  };

  return (
    <div className="dash-con faq cx_listnx_full flex-row j-start al-start">
      <Layout
        subClassName="faq_sec"
        links={data.map((info, i) => (
          <li key={`side_link_courses_${i}`}>
            <NavLink exact className="side_link" to={`/faqs${info.link}`}>
              {info.title}
            </NavLink>
          </li>
        ))}
      >
        {newdata[currentSection].info.map((faq, i) => (
          <RevielDrop
            data-index={i}
            key={`faq_list+${i}`}
            header={
              <h2 className="flex-row j-start">
                <span>{faq.title}</span>
              </h2>
            }
          >
            <div className="inf_x">
              {faq.desc.map((de, i) => (
                <p key={`faq_desc+${i}`}>{de}</p>
              ))}
            </div>
          </RevielDrop>
        ))}
      </Layout>
    </div>
  );
};

export default FAQ;
