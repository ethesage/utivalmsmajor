import React from 'react';
// import no_file from "../../assets/dashboard/no_file.png";
import dots from '../../../assets/dashboard/dots.png';
import FilesSec from '../FileSec';
import '../../Classes/style.scss';
import './style.scss';

const Files = () => {
  const onClick = (e) => {
    e.target.nextElementSibling.classList.toggle('op-dp_2x');
  };

  const close = (e) => {
    const opened = document.querySelectorAll('.op-dp_2x');
    opened.forEach((e) => e.classList.remove('op-dp_2x'));
  };

  function handleClick(e) {
    const elements = document.querySelectorAll('.h_con');

    elements.forEach((element) => {
      if (e.target === element) return;
      element.classList.remove('active');
      element.nextElementSibling.classList.remove('show');
    });

    e.target.classList.toggle('active');
    e.target.nextElementSibling.classList.toggle('show');
  }

  return (
    <div className="file_folders info_con scrolled flex-col al-start j-space">
      <div className="file_sec">
        <div className="">
          <div className="dots flex-row j-space" onBlur={close}>
            <h2>Jude</h2>
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

          <div>
            <FilesSec />
            <FilesSec />
            <FilesSec />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Files;
