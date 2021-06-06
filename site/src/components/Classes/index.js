import { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  getResources,
  deleteResources,
  studentProgress,
  courseProgress,
} from 'g_actions/member';
import Editor from 'components/Editor';
import ProgressBar from 'components/ProgressBar';
import { axiosInstance } from 'helpers';
import Modal from '../Modal';
import Files from 'components/Files';
import Trainer from './trainers';
import { uploadProgress } from 'helpers';
import Live from 'assets/icons/class/live';
import Video from 'assets/icons/class/video';
import Button from 'components/Button';
import ClassVideos from './classVideos';
import Close from 'assets/icons/close';
import Plus from 'assets/icons/plus';

function Classes({
  data,
  openedRef,
  completedPayment,
  currentCourse,
  courseCohortId,
}) {
  const { title, description, link, CohortClassDays } = data;
  const { isStudent, isAdmin, isTrainer } = useSelector((state) => state.auth);
  const [showResourceDrop, setShowResourceDrop] = useState(false);
  const [playLarge, setPlayLarge] = useState();
  const [wait, setWait] = useState(false);
  const [progress, setProgress] = useState(0);
  const { classResources } = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const startclass = useRef();
  const progressDialog = useRef();
  const { addToast } = useToasts();
  const classRef = useRef();
  const classId = data.id;

  const date = CohortClassDays[0]?.date;
  const time = CohortClassDays[0]?.date;

  const closeLargePlayer = () => {
    setPlayLarge(false);
  };

  const classType = 'video';

  useEffect(() => {
    if (!openedRef) return;

    showResourceDrop &&
      setShowResourceDrop(classRef.current === openedRef.current);

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedRef]);

  const joinclass = async () => {
    setWait(false);
    openclass();
    let result;
    if (isStudent) {
      result = await dispatch(studentProgress(courseCohortId, classId));
      if (result.data) {
        window.open(link, '_blank');
        openclass(true);
      } else if (result.error === 'Not Started') {
        setWait(true);
      } else {
        openclass(true);
        addToast('Request Failed', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    } else {
      openclass();
      result = await dispatch(courseProgress(courseCohortId, classId));
      openclass(true);

      if (result.data) {
        window.open(link, '_blank');
      } else {
        addToast('You are not allowed to start this class', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };

  const delete_file = async (file) => {
    try {
      const res = await axiosInstance.delete(
        `/file?path=${encodeURIComponent(file)}`
      );
      if (res) {
        dispatch(deleteResources(title, file));

        return true;
      }
    } catch (err) {
      // console.log(err);
      addToast('Error Deleting file', {
        appearance: 'error',
        autoDismiss: true,
      });
      return false;
    }
  };

  const openclass = (state) => {
    !state && startclass.current.open();
    state && startclass.current.close();
  };

  const upload = async (files) => {
    const fileName = files.name;
    const path = `Courses/${currentCourse.name}/classes/${data.title}/resources`;

    const type = files.type;
    const formData = new FormData();

    formData.append('file', files);
    formData.append('path', path);
    formData.append('fileName', fileName);
    formData.append('mime', type);

    progressDialog.current.open();

    try {
      await axiosInstance.post('file/create', formData, {
        onUploadProgress: uploadProgress(setProgress),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });

      setProgress(100);

      dispatch(
        getResources(title, {
          Key: `${path}/${fileName}`,
          Size: files.size,
        })
      );

      setTimeout(function () {
        progressDialog.current.close();
      }, 2000);
    } catch (err) {
      console.log(err);
      progressDialog.current.close();

      addToast('Error Uploding File', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  // completedPayment

  // {!completedPayment && (
  //   <div className="cx_lis-content ">
  //     <p>You do not have access to this class</p>
  //   </div>
  // )}

  return (
    <>
      <div className="-m-10">
        <div className="flex flex-wrap">
          {classType === 'live' && (
            <div className="w-full max-w-md p-10">
              <div className="h-80 bg-theme shadow rounded-md sticky top-20"></div>
            </div>
          )}

          <div className="p-10 flex-grow max-w-4xl">
            <div className="text-gray-500 flex text-sm items-center my-5">
              {classType === 'live' && (
                <>
                  <Live className="fill-current mr-5" /> <p>Live Class</p>{' '}
                </>
              )}
              {classType === 'video' && (
                <>
                  <Video className="fill-current mr-5" /> <p>Video Class</p>{' '}
                </>
              )}
            </div>

            <div>
              <div className="pb-14">
                <h1 className="text-theme mb-7">
                  <strong>{data.title}</strong>{' '}
                </h1>

                <Editor
                  key={description}
                  readOnly={true}
                  data={description}
                  mode="no-edit"
                />
              </div>

              <div className="border-b border-t border-gray-200 py-14 w-full">
                {classType === 'live' && (
                  <>
                    <h1 className="text-theme mb-7">
                      <strong>Class Schedule</strong>{' '}
                    </h1>

                    <div className="-m-3.5">
                      <div className="flex flex-wrap items-center justify-between w-full max-w-3xl">
                        <div className="p-3.5 flex flex-wrap text-sm">
                          <span className="inline-block mr-5">
                            <strong className="mr-3">Date: </strong>
                            {date
                              ? moment(date).format('Do MMMM YYYY')
                              : 'Not set yet'}
                          </span>
                          <span>
                            <strong className="mr-3">Time: </strong>
                            <span className="uppercase">
                              {time
                                ? moment(time).format('HH:MM a')
                                : 'Not set yet'}
                            </span>
                          </span>
                        </div>
                        <div className="p-3.5">
                          <Button
                            text="Enter Class"
                            className="use-theme"
                            onClick={joinclass}
                          ></Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {classType === 'video' && (
                  <div
                    className={`class-video-section flex flex-col ${
                      playLarge ? 'play-large' : ''
                    }`}
                  >
                    <div className="w-full relative vid">
                      <div className="vid-section w-full">
                        <video
                          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                          className="w-full h-full object-contain bg-black rounded-sm"
                        ></video>
                      </div>
                    </div>

                    {playLarge && (
                      <button
                        className="fixed p-2 top-2 left-2 bg-white"
                        onClick={closeLargePlayer}
                      >
                        <Close className="w-5 h-5" />
                      </button>
                    )}

                    {playLarge && (
                      <div className="container mt-10 flex-grow overflow-auto text-txt">
                        <h1 className="mb-7">
                          <strong>{data.title}</strong>{' '}
                        </h1>

                        <Editor
                          key={description}
                          readOnly={true}
                          data={description}
                          mode="no-edit"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-200 py-14 w-full">
                <h1 className="text-theme mb-7">
                  <strong>
                    Trainer{data?.CohortTrainers.length > 1 ? 's' : ''}
                  </strong>
                </h1>

                <Trainer isAdmin={isAdmin} data={data} />
              </div>

              <div className="py-14">
                <div className="flex justify-between items-center">
                  <h1 className="text-theme mb-7">
                    <strong>Resources</strong>
                  </h1>

                  <Plus className="w-8 h-8 fill-current text-theme" />
                </div>

                <div className="btn_sec_con flex-row j-start">
                  <Files
                    files={classResources[title].resources}
                    errorMsg="No materials available yet"
                    showdrag={false}
                    isStudent={isStudent}
                    deleteFile={delete_file}
                    // errorMsg={
                    //   dropType === 'resource'
                    //     ? 'No materials for this class yet'
                    //     : 'No assignment Yet'
                    // }
                    // deleteFile={deleteFIle}
                    // handleImage={upload}
                  />
                </div>
              </div>

              {classType === 'live' && (
                <div className="border-t border-gray-200 py-14 w-full">
                  <ClassVideos data={data} isStudent={isStudent} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {completedPayment && (
        <>
          <Modal ref={progressDialog}>
            <ProgressBar progress={progress * 0.95} />
          </Modal>

          <Modal ref={startclass}>
            <div
              style={{
                background: 'white',
                width: '400px',
                height: '300px',
                textAlign: 'center',
                margin: 'auto',
                borderRadius: '10px',
              }}
              className="s_btn flex-row loader"
            >
              {(isTrainer || isAdmin) && (
                <p className="loader_con_main">Loading class...</p>
              )}
              {wait ? (
                <div>This class is yet to start</div>
              ) : (
                <p className="loader_con_main">Loading class...</p>
              )}
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default Classes;
