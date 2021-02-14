import React from 'react';
import girl from 'assets/homepage/girl.png';
import Image from 'components/Image';
import './style.scss';

const data = [
  {
    title: 'Self-paced Learning',
    desc: 'At your convenience',
  },
  {
    title: 'Live classes',
    desc: 'Learn with Others',
  },
  {
    title: 'Virtual Internship',
    desc: 'Hands-on Project-based Internship',
  },
];

const Course = () => {
  return (
    <section className="gt_str m-150">
      <h2 className="hd middle">Be Future-Proof</h2>
      <div className="gt_str_sec">
        <div className="text-sec flex-col j-end al-start">
          {data.map((st, i) => (
            <div className="txt-crd flex-row" key={`txt_gt_card${i}`}>
              <div className="contents">
                <div className="num flex-row j-start">
                  <span className="flex-row">
                    <div className="num-con flex-row">
                      <p>{`0${i}`}</p>
                    </div>
                  </span>
                </div>
                <div className="info  flex-row j-space">
                  <h2>{st.title}</h2>
                  <p>{st.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="img-sec">
          <Image
            image={girl}
            lazyLoad={true}
            usePlaceHolder={true}
            imgClass="img contain"
            alt="get Started"
          />
        </div>
      </div>
    </section>
  );
};

export default Course;
