import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPrevVideoFn, removePrevVideoFn } from 'g_actions/admin';
import Button from 'components/Button';
import Input from 'components/Input';
import Plus from 'assets/icons/plus';
import Remove from 'assets/icons/remove';
import './style.scss';


function ClassVideos({ data, full, isStudent, classId, currentCohort }) {
  const [addPrevVideo, setAddPrevVideo] = useState(false);
  const [prevVideo, setPrevVideo] = useState('');

  const dispatch = useDispatch();
  const vidrefs = {};

  const courseName = currentCohort && Object.keys(currentCohort)[0];

  const handleChange = ({ target: { value } }) => {
    setPrevVideo(value);
  };

  const addVideo = async (e) => {
    if (!prevVideo || !prevVideo.match(/vimeo\.com\/(\d+)/)) {
      return;
    }

    const courseCohortId = currentCohort[courseName]?.id || data.courseCohortId;

    document.querySelector('body').classList.add('spinner1');

    await dispatch(
      addPrevVideoFn(
        prevVideo.split('.com/')[1],
        courseName,
        classId,
        courseCohortId
      )
    );

    document.querySelector('body').classList.remove('spinner1');

    setPrevVideo('');
    setAddPrevVideo(false);
  };

  const removeVideo = async (id) => {
    vidrefs[id].classList.add('spinner1');
    vidrefs[id].classList.remove('allowHover');

    try {
      await dispatch(removePrevVideoFn(courseName, classId, id));
    } catch (err) {
      vidrefs[id].classList.remove('spinner1');
      vidrefs[id].classList.add('allowHover');
    }
  };

  return (
    full &&
    (data.CohortClassVideos.length > 0 || !isStudent) && (
      <div className="prev_vid_cn reg_text" id="#class-videos">
        <nav className="flex-row j-space">
          <h4 className="theme-color">
            Class recordings
            {data.CohortClassVideos.length <= 1 ? '' : 's'}
          </h4>

          {!isStudent && (
            <div
              onClick={() => {
                setAddPrevVideo(!addPrevVideo);
                setPrevVideo('');
              }}>
              {!addPrevVideo ? <Plus /> : <Remove />}
            </div>
          )}
        </nav>

        <div className="prevForm" data-active={addPrevVideo}>
          {addPrevVideo && (
            <div className="flex-row j-start al-start form_sec">
              <Input
                handleChange={handleChange}
                name="vimeo"
                value={prevVideo}
                placeHolder="Enter your video url"
                errorMsg="enter a valid video url"
              />

              <Button text="Add" className="flex-row" onClick={addVideo} />
            </div>
          )}
        </div>

        {data.CohortClassVideos.length === 0 && (
          <div className="flex-row" style={{ marginTop: '50px' }}>
            <p>No videos yet</p>
          </div>
        )}

        <div className="frame_sec">
          {data.CohortClassVideos.map((prevVideo, i) => (
            <div
              className={`frame_con ${!isStudent ? 'allowHover' : ''}`}
              key={`prev_vid_data_${prevVideo.id.split('-')[0]}`}
              ref={(ref) => (vidrefs[prevVideo.id] = ref)}>
              <div className="rm" onClick={() => removeVideo(prevVideo.id)}>
                <Remove />
              </div>
              <iframe
                title={`${data.id}_previous_video_${i}`}
                src={`https://player.vimeo.com/video/${prevVideo.link}`}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen></iframe>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
export default ClassVideos;
