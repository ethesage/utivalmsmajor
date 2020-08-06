import React from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import img1 from "../../assets/homepage/img1.png";
import "./style.scss";

const CousreCard = ({ img }) => {
  return (
    <div className="ac_cx_cd flex-row j-start al-start">
      <div className="img-sec" to={`/dashboard/courses/233456`}>
        <img src={img1} alt="" className="img cover" />
      </div>
      <div className="txt-sec flex-col j-space">
        <div className="title_sec flex-row j-space">
          <h3 className="theme-color">Data Accelerator</h3>
        </div>

        <div className="px">
          <small>Completion level</small>
          <Progress
            className="slim"
            percent={40}
            status="error"
            theme={{
              success: {
                symbol: "‍",
                color: "rgb(223, 105, 180)",
              },
              error: {
                symbol: "40%",
                color: "red",
              },
              default: {
                symbol: "😱",
                color: "#fbc630",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CousreCard;
