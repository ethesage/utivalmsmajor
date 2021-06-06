import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPrevVideoFn, removePrevVideoFn } from 'g_actions/admin';
import Button from 'components/Button';
import Input from 'components/Input';
import Plus from 'assets/icons/plus';
import loader from 'assets/loader.gif';
import Video from 'assets/icons/class/video';
import './style.scss';

function ClassVideos({ data, isStudent, classId, currentCohort }) {
  const [addPrevVideo, setAddPrevVideo] = useState(false);
  const [prevVideo, setPrevVideo] = useState('');
  const [loadingRemove, setLoadingRemove] = useState(false);
  const [loadingAddVideo, setLoadingAddVideo] = useState(false);

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

    setLoadingAddVideo(true);

    await dispatch(
      addPrevVideoFn(
        prevVideo.split('.com/')[1],
        courseName,
        classId,
        courseCohortId
      )
    );

    setLoadingAddVideo(false);

    setPrevVideo('');
    setAddPrevVideo(false);
  };

  const removeVideo = async (id) => {
    setLoadingRemove(true);

    try {
      await dispatch(removePrevVideoFn(courseName, classId, id));
    } catch (err) {}

    setLoadingRemove(false);
  };

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center">
        <h1 className="text-theme mb-5">
          <strong>
            Class recording
            {data.CohortClassVideos.length <= 1 ? '' : 's'}
          </strong>
        </h1>

        {!isStudent && (
          <div
            onClick={() => {
              setAddPrevVideo(!addPrevVideo);
              setPrevVideo('');
            }}
            className="flex items-center"
          >
            {!loadingAddVideo ? (
              <div className="inline-block">
                <Plus className="w-8 h-8 fill-current text-theme" />
              </div>
            ) : (
              <img
                className="w-10 h-10 ml-4 inline-block"
                src={loader}
                alt="loader"
              />
            )}
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
              errorMsg="enter a vtraalid video url"
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

      <div>
        {data.CohortClassVideos.map((prevVideo, i) => (
          <div
            className="-m-3"
            key={`prev_vid_data_${prevVideo.id.split('-')[0]}`}
            ref={(ref) => (vidrefs[prevVideo.id] = ref)}
          >
            <div className="flex flex-wrap justify-between p-3">
              <a href={prevVideo.link} target="_" className="text-sm">
                <Video className="inline-block fill-current text-theme mr-5" />
                {prevVideo.link}
              </a>

              {!isStudent && (
                <div>
                  {!loadingRemove ? (
                    <button
                      className="text-xs font-semibold text-tomato inline-block"
                      onClick={() => removeVideo(prevVideo.id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <img
                      className="w-10 h-10 ml-4 inline-block"
                      src={loader}
                      alt="loader"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ClassVideos;
