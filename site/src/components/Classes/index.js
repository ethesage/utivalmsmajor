import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  getAssignments,
  getResources,
  deleteAssignmnet,
  deleteResources,
  studentProgress,
  courseProgress,
} from 'g_actions/member';
import { addPrevVideoFn, removePrevVideoFn } from 'g_actions/admin';
import ProgressBar from 'components/ProgressBar';
import Button from 'components/Button';
import Input from 'components/Input';
import { weeks, axiosInstance } from 'helpers';
import Confirm from 'components/Confirm';
import play from 'assets/icons/course/play.png';
import material from 'assets/icons/course/material.png';
import assignment from 'assets/icons/course/assignment.png';
import class_icon from 'assets/icons/class_icon.png';
import Plus from 'assets/icons/plus';
import Remove from 'assets/icons/remove';
import Modal from '../Modal';
import user_icon from 'assets/user_icon.png';
import Files from 'components/Files';
import ResourceBtn from '../ResourceButton';
import RevielDrop from '../RevielDrop';

import './style.scss';

function Classes({
  data,
  courseId,
  open = false,
  showArrow = true,
  full,
  index,
  showResources = true,
  gapi,
  folderId,
  cohortId,
  assData,
  openedRef,
  setOpenedRef,
  addAssignment,
  editClass,
}) {
  const { title, description, link, courseCohortId } = data;
  const { isStudent, isAdmin, isTrainer } = useSelector((state) => state.auth);
  const [showResourceDrop, setShowResourceDrop] = useState(false);
  const [currentFile, setCurrentFile] = useState();
  const [wait, setWait] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dropType, setDropType] = useState();
  const [addPrevVideo, setAddPrevVideo] = useState(false);
  const [prevVideo, setPrevVideo] = useState('');
  const { classResources, currentCourse } = useSelector(
    (state) => state.member
  );
  const { currentCohort } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const deleteDialog = useRef();
  const startclass = useRef();
  const progressDialog = useRef();
  const { addToast } = useToasts();
  const classRef = useRef();
  const vidrefs = {};

  const classId = data.id;
  const courseName = currentCohort && Object.keys(currentCohort)[0];

  const list_desc = currentCourse.list_desc || currentCourse?.Course?.list_desc;

  const resources = data.ClassResources.filter(
    (res) => res.type === 'resource'
  );
  const assignment_ = data.ClassResources.filter(
    (res) => res.type === 'assignment'
  );

  const getFiles = useCallback(
    async (id) => {
      if (!gapi) return;
      return await gapi.gapi.get(
        null,
        id,
        'id, name, iconLink, webContentLink, size, webViewLink, parents'
      );
    },
    [gapi]
  );

  useEffect(() => {
    if (!openedRef) return;

    showResourceDrop &&
      setShowResourceDrop(classRef.current === openedRef.current);

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedRef]);

  useEffect(() => {
    if (!classResources[title].files) {
      if (resources.length === 0) {
        dispatch(getResources(title, null));
      }

      resources.forEach(async (resource) => {
        const file = await getFiles(resource.link);

        dispatch(
          getResources(title, {
            ...resource,
            resourceId: resource.id,
            ...file,
            comments: null,
          })
        );
      });
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!classResources[title].assignment) {
      if (assignment_.length === 0) {
        dispatch(getAssignments(title, null));
      }

      assignment_.forEach(async (resource) => {
        const file = await getFiles(resource.link);

        dispatch(
          getAssignments(title, {
            ...resource,
            resourceId: resource.id,
            ...file,
            comments: null,
          })
        );
      });
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dropDrop = (type) => {
    dropType === type || !dropType
      ? setShowResourceDrop(!showResourceDrop)
      : setShowResourceDrop(true);
    setDropType(type);
  };

  const viewResources = (e) => {
    e.preventDefault();

    if (!isStudent) {
      dropDrop('resource');
    } else modalRef.current.open();
  };

  const joinclass = async () => {
    // console.log("joinclassmmm", isTrainer);
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

  const handleChange = ({ target: { value } }) => {
    setPrevVideo(value);
  };

  const addVideo = async (e) => {
    if (!prevVideo || !prevVideo.match(/vimeo\.com\/(\d+)/)) {
      console.log('incorrect value');
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

  // const viewFile = async (contentLink) => {
  //   window.open(contentLink, '_blank');
  // };

  // const viewAssignment = (e) => {
  //   e.preventDefault();

  //   // console.log(classResources[title].assignment[0]);

  //   if (!isStudent) {
  //     dropDrop('assignment');
  //   } else viewFile(classResources[title].assignment[0].webViewLink);
  // };

  const delete_file = async () => {
    const file =
      dropType === 'resource'
        ? classResources[title].files.find((file) => file.id === currentFile)
        : classResources[title].assignment[0];

    const resourceId = file.resourceId;

    const slug =
      dropType === 'resource' ? `class/assignment/` : `class/assignment/`;

    try {
      const res = await axiosInstance.delete(`${slug}${resourceId}`);
      if (res) {
        dropType === 'resource'
          ? dispatch(deleteResources(title, file.id))
          : dispatch(deleteAssignmnet(title, file.id));
        await gapi.gapi.deleteFile(file.id);
        setCurrentFile(null);
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

  const deleteFIle = (id) => {
    setCurrentFile(id);
    deleteDialog.current.open();
  };

  const openclass = (state) => {
    !state && startclass.current.open();
    state && startclass.current.close();
  };

  const upload = async (files) => {
    progressDialog.current.open();
    let file;

    try {
      file = await gapi.gapi.upload(files, setProgress, folderId);

      const res = await axiosInstance.post(`class/${dropType}/${data.id}`, {
        link: file.id,
      });

      if (res) {
        file = await getFiles(file.id);
        file.resourceId = res.data.data.id;
        setProgress(100);

        dispatch(getResources(title, file));

        setTimeout(function () {
          progressDialog.current.close();
        }, 2000);
      }
    } catch (err) {
      // console.log(err);
      progressDialog.current.close();

      addToast('Error Uploding File', {
        appearance: 'error',
        autoDismiss: true,
      });

      file && (await gapi.gapi.deleteFile(file.id));
    }
  };

  const handleImgError = (e) => {
    e.target.src = user_icon;
  };

  return (
    <>
      <div className="cx_listnx_con" ref={classRef}>
        <RevielDrop
          open={open}
          showArrow={showArrow}
          runOnOpen={() => {
            setOpenedRef && setOpenedRef(classRef);
          }}
          runOnClose={() => !full && setShowResourceDrop(false)}
          className="hx-main"
          header={
            <div className="cx_header flex-row j-space">
              <h2 className={`h_con flex-row j-start  ${full ? ' full' : ''}`}>
                <img src={class_icon} alt="class" />{' '}
                <div className="flex-row j-space img">
                  <span>
                    {Number(index + 1)
                      ? `${list_desc} ${weeks[index + 1]} - `
                      : ''}{' '}
                    {title}
                  </span>
                  {(isAdmin || isTrainer) && full ? (
                    <>
                      {isAdmin && (
                        <div className="edit_btns flex-row">
                          <div className="edit_btns">
                            <Link
                              to={`/admin/courses/classroom/${courseId}/${cohortId}/${data.id}/edit`}
                              className="edit"
                            >
                              Edit Class
                            </Link>
                          </div>
                          {Array.isArray(classResources[title].assignment) && (
                            <Link
                              to=""
                              className="edit"
                              onClick={(e) => {
                                e.preventDefault();
                                addAssignment();
                              }}
                            >
                              {classResources[title].assignment.length === 0
                                ? 'Add Assignment'
                                : 'Edit Assignment'}
                            </Link>
                          )}
                        </div>
                      )}
                      {isTrainer &&
                        Array.isArray(classResources[title].assignment) && (
                          <div className="edit_btns">
                            <Link
                              to=""
                              className="edit"
                              onClick={(e) => {
                                e.preventDefault();
                                addAssignment();
                              }}
                            >
                              {classResources[title].assignment.length === 0
                                ? 'Add Assignment'
                                : 'Edit Assignment'}
                            </Link>
                          </div>
                        )}
                    </>
                  ) : null}
                </div>
              </h2>
            </div>
          }
        >
          <div className={`cx_lis-content ${full ? ' full' : ''}`}>
            {assData?.length > 0 ? (
              <div className="inf_x">
                <h3>{assData[0].title}</h3>
                <p>{assData[0].description}</p>
              </div>
            ) : (
              <div className="inf_x">
                <p>{description}</p>
              </div>
            )}

            {showResources ? (
              <div className="btns">
                <div className="reg_text">
                  <div className="btn_sec_con flex-row j-start">
                    <div className="btn_sec">
                      <ResourceBtn
                        img={play}
                        text={isAdmin ? 'Class Link' : 'Join Class'}
                        color="theme"
                        link={link}
                        ext
                        handleClick={joinclass}
                      />
                    </div>

                    {(assignment_.length > 0 || !isStudent) && (
                      <div className="btn_sec">
                        <ResourceBtn
                          img={assignment}
                          text="Assignment"
                          color="off"
                          link={
                            isAdmin
                              ? `/admin/courses/all-assignments/${courseId}/${cohortId}/${data.id}`
                              : isTrainer
                              ? `/courses/all-assignments/${courseId}/${data.id}`
                              : `/courses/assignment/${courseId}/${data.id}`
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                {isAdmin && full && (
                  <div>
                    <h4
                      style={{ margin: '40px 0 10px' }}
                      className="theme-color"
                    >
                      Trainer
                    </h4>

                    {data?.CohortTrainer?.User ? (
                      <div className="trainer flex-row j-start">
                        <img
                          src={
                            data?.CohortTrainer?.User?.profilePic || user_icon
                          }
                          alt="userimage"
                          onError={handleImgError}
                        />
                        <div>
                          <strong>
                            <p>
                              {data.CohortTrainer.User.firstName}{' '}
                              {data.CohortTrainer.User.lastName}
                            </p>
                          </strong>
                          <small>{data.CohortTrainer.User.occupation}</small>
                        </div>
                      </div>
                    ) : (
                      <p>No Trainer has been assigned to this class</p>
                    )}
                  </div>
                )}

                <div className="reg_text">
                  <h4>Resources</h4>
                  <div className="btn_sec_con flex-row j-start">
                    <div className="btn_sec">
                      <ResourceBtn
                        img={material}
                        text={`${isStudent ? 'Download' : 'Class'} Materials`}
                        color="secondary"
                        link=""
                        handleClick={viewResources}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}

            {!full ? (
              <Link
                className="view"
                to={
                  isAdmin
                    ? `/admin/courses/classroom/${courseId}/${cohortId}/${data.id}`
                    : `/courses/classroom/${courseId}/${data.id}`
                }
              >
                View full outline
              </Link>
            ) : null}

            {full && (data.CohortClassVideos.length > 0 || !isStudent) && (
              <div className="prev_vid_cn reg_text">
                <nav className="flex-row j-space">
                  <h4 className="theme-color">
                    Previous class video
                    {data.CohortClassVideos.length <= 1 ? '' : 's'}
                  </h4>

                  {!isStudent && (
                    <div
                      onClick={() => {
                        setAddPrevVideo(!addPrevVideo);
                        setPrevVideo('');
                      }}
                    >
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

                      <Button
                        text="Add"
                        className="flex-row"
                        onClick={addVideo}
                      />
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
                      ref={(ref) => (vidrefs[prevVideo.id] = ref)}
                    >
                      <div
                        className="rm"
                        onClick={() => removeVideo(prevVideo.id)}
                      >
                        <Remove />
                      </div>
                      <iframe
                        title={`${data.id}_previous_video_${i}`}
                        src={`https://player.vimeo.com/video/${prevVideo.link}`}
                        frameBorder="0"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </RevielDrop>
        {/** For  a student show the modal pop up for the class materails and assignments
         * but for a trainer show this as a section underneat, this then helps to show the modal for uploading or deleting. Since we don't want overlapping modals
         */}

        {!isStudent ? (
          <RevielDrop open={showResourceDrop}>
            <div className="class_file_con">
              <div className="box-shade" data-open={showResourceDrop}>
                <h3>
                  {dropType === 'resource'
                    ? 'Resource Materials'
                    : 'Class assignment'}
                </h3>
                <Files
                  files={
                    dropType === 'resource'
                      ? classResources[title]?.files
                      : classResources[title]?.assignment
                  }
                  showdrag={
                    dropType === 'resource' ? true : false
                    // : !!!classResources[title].files
                  }
                  errorMsg={
                    dropType === 'resource'
                      ? 'No materials for this class yet'
                      : 'No assignment Yet'
                  }
                  deleteFile={deleteFIle}
                  handleImage={upload}
                />
              </div>
            </div>
          </RevielDrop>
        ) : (
          <Modal ref={modalRef}>
            <div className="class_file_con">
              <h3>Resource Materials</h3>
              <Files
                files={classResources[title].files}
                errorMsg="No materials availabel yet"
                showdrag={false}
              />
            </div>
          </Modal>
        )}
      </div>
      <Modal ref={deleteDialog}>
        <Confirm
          text="Are you sure?"
          onClick={delete_file}
          close={() => deleteDialog.current.close()}
          closeText="Successfuly Deleted"
        />
      </Modal>

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
  );
}
export default Classes;
