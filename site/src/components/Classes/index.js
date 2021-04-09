import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import {
  getResources,
  deleteAssignmnet,
  deleteResources,
  studentProgress,
  courseProgress,
} from 'g_actions/member';
import Editor from 'components/Editor';
import ProgressBar from 'components/ProgressBar';
import { axiosInstance } from 'helpers';
import Confirm from 'components/Confirm';
import play from 'assets/icons/course/play.png';
import material from 'assets/icons/course/material.png';
import assignment from 'assets/icons/course/assignment.png';
import Modal from '../Modal';
import Files from 'components/Files';
import ResourceBtn from '../ResourceButton';
import RevielDrop from '../RevielDrop';
import HeadSection from './headSection';
import Trainer from './trainers';
import ClassVideos from './classVideos';
import { toBase64, uploadProgress } from 'helpers';
import './style.scss';

function Classes({
  data,
  courseId,
  open = false,
  showArrow = true,
  full,
  index,
  showResources = true,
  cohortId,
  assData,
  openedRef,
  setOpenedRef,
  addAssignment,
  completedPayment,
  currentCourse,
  courseCohortId,
  editClass,
}) {
  const { title, description, link } = data;
  const { isStudent, isAdmin, isTrainer } = useSelector((state) => state.auth);
  const [showResourceDrop, setShowResourceDrop] = useState(false);
  const [currentFile, setCurrentFile] = useState();
  const [wait, setWait] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dropType, setDropType] = useState();
  const { classResources } = useSelector((state) => state.member);
  const { currentCohort } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const deleteDialog = useRef();
  const startclass = useRef();
  const progressDialog = useRef();
  const { addToast } = useToasts();
  const classRef = useRef();
  const classId = data.id;

  const list_desc =
    currentCourse?.list_desc || currentCourse?.Course?.list_desc;

  useEffect(() => {
    if (!openedRef) return;

    showResourceDrop &&
      setShowResourceDrop(classRef.current === openedRef.current);

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedRef]);

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

  const delete_file = async () => {
    try {
      const res = await axiosInstance.delete(
        `/file?path=${encodeURIComponent(currentFile)}`
      );
      if (res) {
        dropType === 'resource'
          ? dispatch(deleteResources(title, currentFile))
          : dispatch(deleteAssignmnet(title, currentFile));

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

  const deleteFIle = (file) => {
    setCurrentFile(file);
    deleteDialog.current.open();
  };

  const openclass = (state) => {
    !state && startclass.current.open();
    state && startclass.current.close();
  };

  const upload = async (files) => {
    const fileName = files.name;
    const path = `Courses/${currentCourse.name}/classes/${data.title}/resources`;
    const file = await toBase64(files);

    progressDialog.current.open();

    try {
      await axiosInstance.post(
        'file/create',
        {
          file,
          path,
          fileName,
        },
        {
          onUploadProgress: uploadProgress(setProgress),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }
      );

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

  return (
    <>
      <div
        className={`cx_listnx_con ${!completedPayment ? 'greyed' : ''}`}
        ref={classRef}
      >
        <RevielDrop
          open={open}
          showArrow={showArrow}
          runOnOpen={() => {
            setOpenedRef && setOpenedRef(classRef);
          }}
          runOnClose={() => setShowResourceDrop(false)}
          header={
            <HeadSection
              index={index}
              full={full}
              list_desc={list_desc}
              cohortId={cohortId}
              data={data}
              classResources={classResources}
              isAdmin={isAdmin}
              isTrainer={isTrainer}
              courseId={courseId}
              addAssignment={addAssignment}
            />
          }
        >
          {completedPayment && (
            <div className={`cx_lis-content ${full ? ' full' : ''}`}>
              {assData?.length > 0 ? (
                <div className="inf_x">
                  <h3>{assData[0].title}</h3>
                  <p>{assData[0].description}</p>

                  <div
                    className="flex-row j-start"
                    style={{ marginTop: '20px' }}
                  >
                    <p>
                      <strong>Points:</strong> {assData[0].point}
                    </p>{' '}
                    <p style={{ marginLeft: '10px' }}>
                      <strong>DueDate:</strong>{' '}
                      {moment(assData[0]?.dueDate).format('YYYY-MM-DD')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="inf_x">
                  {/* <p>{title}</p> */}
                  <Editor
                    key={description}
                    readOnly={true}
                    data={description}
                    mode="no-edit"
                  />
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

                      {classResources[title]?.assignments.length > 0 &&
                        isStudent && (
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

                  <Trainer isAdmin={isAdmin} full={full} data={data} />

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
            </div>
          )}
          {!completedPayment && (
            <div className="cx_lis-content ">
              <p>You do not have access to this class</p>
            </div>
          )}
        </RevielDrop>
        {/** For  a student show the modal pop up for the class materails and assignments
         * but for a trainer show this as a section underneat, this then helps to show the modal for uploading or deleting. Since we don't want overlapping modals
         */}

        {!isStudent && completedPayment ? (
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
                      ? classResources[title]?.resources
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
                files={classResources[title].resources}
                errorMsg="No materials available yet"
                showdrag={false}
              />
            </div>
          </Modal>
        )}
      </div>
      {completedPayment && (
        <>
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

          <ClassVideos
            data={data}
            full={full}
            isStudent={isStudent}
            classId={classId}
            currentCohort={currentCohort}
          />
        </>
      )}
    </>
  );
}
export default Classes;
