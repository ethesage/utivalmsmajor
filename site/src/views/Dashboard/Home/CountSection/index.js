import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../helpers';
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

const CountSection = ({ gapi: { g_api, signedIn } }) => {
  const [data, setData] = useState([
    {
      title: 'Total Courses',
      link: 'course',
      num: 0,
      img: course,
    },
    {
      title: 'Ongoing Courses',
      num: 0,
      link: 'ongoing',
      img: ongoing,
    },
    {
      title: 'Completed Courses',
      num: 0,
      link: 'completed',
      img: completed,
    },
  ]);

  console.log('gapi from count_sec', g_api);

  useEffect(() => {
    if (!g_api) return;
    if (!signedIn) return;
    g_api &&
      g_api.client.drive.files
        .list({
          pageSize: 10,
          id: '1F0r-bTgMLTkUhBf2o-ZTwtCPB3dWfnXp',
          fields: 'nextPageToken, files(id, name, mimeType)',
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

    g_api &&
      g_api.client.drive.files
        .get({ fileId: '1Zk11q28vPwgyZsDIFsClftco8wma1dEJOQX0n9EdUAk' })
        .then((res) => console.log(res));

    return () => {};
  }, [g_api, signedIn]);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get('/student/all/dashboard');

      setData((prev) =>
        prev.map((pre) => ({ ...pre, num: response.data.data[pre.link] }))
      );
    })();
  }, []);

  return (
    <>
      {data.map((_data, i) => (
        <CountCard data={_data} key={`course_count_card${i}`} />
      ))}
    </>
  );
};

export default CountSection;
