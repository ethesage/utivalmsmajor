import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import data from "../../data/faqs";
import "../../components/Classroom/FullClass/style.scss";
import "./style.scss";

const FAQ = () => {
  const { info } = useParams();
  const [currentSection, setCurrentection] = useState(
    info === "" || !info ? "general" : info
  );

  useEffect(() => {
    setCurrentection(info === "" || !info ? "general" : info);
    return () => {};
  }, [info]);

  const newdata = {
    general: data[0],
    lectures: data[1],
    certificate: data[2],
  };

  function handleClick(e) {
    const elements = document.querySelectorAll(".h_con");

    elements.forEach((element) => {
      if (e.target === element) return;
      element.classList.remove("active");
      element.nextElementSibling.classList.remove("show");
    });

    e.target.classList.toggle("active");
    e.target.nextElementSibling.classList.toggle("show");
  }

  return (
    <div className="dash-con faq cx_listnx_full flex-row j-start al-start">
      <div className="side_list">
        <ul>
          {data.map((info, i) => (
            <li key={`side_link_courses_${i}`}>
              <NavLink
                exact
                className="side_link"
                to={`/dashboard/faqs${info.link}`}
              >
                {info.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="faq_sec">
        {newdata[currentSection].info.map((faq, i) => (
          <div className="cx_listnx_con" data-index={i} key={`faq_list+${i}`}>
            <div className={`h_con`} onClick={handleClick}>
              <h2 className="cx_lis-header flex-row j-start">
                <span>{faq.title}</span>
              </h2>
            </div>
            <div className={`cx_lis-content`}>
              <div className="inf_x">
                {faq.desc.map((de, i) => (
                  <p key={`faq_desc+${i}`}>{de}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
