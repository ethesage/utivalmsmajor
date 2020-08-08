import React from "react";
// import no_file from "../../assets/dashboard/no_file.png";
import FilesSec from "./FileSec";
import "./style.scss";

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
