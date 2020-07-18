import React from "react";
import Image from "../../../components/Image";
import believe from "../../../assets/homepage/adeola.png";
import "./style.scss";

const index = () => {
  return (
    <section className="est_mi m-150">
      <div className="bl-card container card flex-row">
        <div className="img-sec">
          <Image
            image={believe}
            imgClass="img contain"
            lazyLoad={true}
            usePlaceHolder={true}
          />
        </div>
        <div className="text-sec reg_text">
          <p className="desc spaced">
            The Data Accelerator program of the Data School is designed to help
            professionals learn the analytics and data strategy, bringing the
            value of Big Data Analytics to your current role.
          </p>
          <div>
            <h2>Owosho Adeola</h2>
            <p>Data Analyst, Google Nigeria</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
