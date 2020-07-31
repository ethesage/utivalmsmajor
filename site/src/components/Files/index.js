import React from "react";
// import no_file from "../../assets/dashboard/no_file.png";
import pdf from "../../assets/dashboard/pdf.png";
import word from "../../assets/dashboard/word.png";
import excel from "../../assets/dashboard/excel.png";
import video from "../../assets/dashboard/video.png";
import dots from "../../assets/dashboard/dots.png";
import "./style.scss";

const FilesSec = () => {
  const onClick = (e) => {
    e.target.nextElementSibling.classList.toggle("op-dp_2x");
  };

  const close = (e) => {
    const opened = document.querySelectorAll(".op-dp_2x");

    opened.forEach((e) => e.classList.remove("op-dp_2x"));

    //.classList.remove("op-dp_2x");

    // e.target.querySelector("op-dp_2x")
    console.log(e.target.querySelector("op-dp_2x"));
  };

  return (
    <div className="file_card flex-row al-start j-space">
      <div className="left flex-row j-start">
        <img src={pdf} alt="pdf" />
        <div className="txt-sec">
          <h2 className="clipped-text" style={{ "--number": 1 }}>
            HR Analytics Fundamentals
          </h2>
          <small>10MB</small>
        </div>
      </div>

      <div className="dots" onBlur={close} tabIndex="-1">
        <div className="img-sec" onClick={onClick}>
          <img src={dots} alt="dots" className="img contain" />
        </div>
        <div className="drops">
          <ul>
            <li>View</li>
            <li>Download</li>
            <li>Delete</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Files = () => {
  return (
    <div className="info_con scrolled flex-col al-start j-start">
      <FilesSec />
      <FilesSec />
      <FilesSec />

      {/* <div className="n_available flex-col">
        <img src={no_file} alt="no classes" />
        <p className="txts">You have no files yet</p>
      </div> */}

      <button className="add_file"></button>
    </div>
  );
};

export default Files;
