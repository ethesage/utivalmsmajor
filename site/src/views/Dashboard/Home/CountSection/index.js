import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../../../helpers';
import useGoogle from '../../../../Hooks/useGoogle';
// import drive from '../../../../helpers/drive';
import course from '../../../../assets/icons/dasboard/course.png';
import completed from '../../../../assets/icons/dasboard/completed.png';
import ongoing from '../../../../assets/icons/dasboard/ongoing.png';

const CountCard = ({ data: { title, num, img } }) => (
  <div className="c_card count flex-col al-start j-start">
    <p className="c_title">{title}</p>
    <div className="c_img-sec flex-row j-space">
      <p>{num}</p>
      <div className="img_con">
        <img src={img} alt="course" />
      </div>
    </div>
  </div>
);

const CountSection = () => {
  const gapi = useGoogle();

  useEffect(() => {
    (async () => {
      console.log(gapi);

      // console.log(await axios.get('https://apis.google.com/js/client.js'));
      // const response = await axiosInstance.get('/student/dashboard');
      // console.log(response);
      gapi &&
        gapi.client.drive.files
          .list({
            pageSize: 10,
            fields: 'nextPageToken, files(id, name)',
          })
          .then(function (response) {
            // appendPre('Files:');
            // var files = response.result.files;
            // if (files && files.length > 0) {
            //   for (var i = 0; i < files.length; i++) {
            //     var file = files[i];
            //     appendPre(file.name + ' (' + file.id + ')');
            //   }
            // } else {
            //   appendPre('No files found.');
            // }
            console.log(response);
          });
    })();
  }, [gapi]);

  const [data, setData] = useState([
    {
      title: 'Total Courses',
      num: 1,
      img: course,
    },
    {
      title: 'Ongoing Courses',
      num: 1,
      img: ongoing,
    },
    {
      title: 'Completed Courses',
      num: 1,
      img: completed,
    },
  ]);

  return (
    <>
      {data.map((_data, i) => (
        <CountCard data={_data} key={`course_count_card${i}`} />
      ))}
    </>
  );
};

export default CountSection;
