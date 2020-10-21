import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  getAssignments,
  getResources,
  deleteAssignmnet,
  deleteResources,
} from 'g_actions/member';
import ProgressBar from 'components/ProgressBar';
import { weeks, axiosInstance } from 'helpers';
import Confirm from 'components/Confirm';
import play from 'assets/icons/course/play.png';
import material from 'assets/icons/course/material.png';
import assignment from 'assets/icons/course/assignment.png';
import class_icon from 'assets/icons/class_icon.png';
import Modal from '../../Modal';
import Files from 'components/Files';
import ResourceBtn from '../../ResourceButton';
import RevielDrop from '../../RevielDrop';
import '../Classes/style.scss';

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
}) {
  const { title, description, link } = data;
  const { isStudent, isAdmin, isTrainer } = useSelector((state) => state.auth);
  const [showResourceDrop, setShowResourceDrop] = useState(false);
  const [currentFile, setCurrentFile] = useState();
  const [progress, setProgress] = useState(0);
  const [dropType, setDropType] = useState();
  const { classResources } = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const deleteDialog = useRef();
  const progressDialog = useRef();
  const { addToast } = useToasts();

  const assignment_ = data.ClassResouces.filter(
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
    if (!classResources[title].files) {
      if (resources.length === 0) {
        dispatch(getResources(title, []));
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
  }, []);

  const dropDrop = (type) => {
    dropType === type || !dropType
      ? setShowResourceDrop(!showResourceDrop)
      : setShowResourceDrop(true);
    setDropType(type);
  };

  const viewFile = async (contentLink) => {
    window.open(contentLink, '_blank');
  };

  const download = async (contentLink) => {
    window.open(contentLink);
  };

  const viewAssignment = (e) => {
    e.preventDefault();
    if (!isStudent) {
      dropDrop('assignment');
    } else
      viewFile(
        classResources[title].assignment &&
          classResources[title].assignment.webViewLink
      );
  };

  const delete_file = async () => {
    const file =
      dropType === 'resource'
        ? classResources[title].files.find((file) => file.id === currentFile)
        : classResources[title].assignment;

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
      console.log(err);
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

        getResources(title, file);

        dispatch(getResources(title, file));

        setTimeout(function () {
          progressDialog.current.close();
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      progressDialog.current.close();

      addToast('Error Uploding File', {
        appearance: 'error',
        autoDismiss: true,
      });

      file && (await gapi.gapi.deleteFile(file.id));
    }
  };

  // const upload = async (files, folderId) => {
  //   modalRef.current.open();
  //   gapi.gapi.upload(files, setProgress, '1F0r-bTgMLTkUhBf2o-ZTwtCPB3dWfnXp');
  // };

  return (
    <>
      <div className="cx_listnx_con">
        <RevielDrop
          open={open}
          showArrow={showArrow}
          header={
            <div className="cx_header flex-row j-space">
              <h2 className={`h_con flex-row j-start ${full ? ' full' : ''}`}>
                <img src={class_icon} alt="class" />{' '}
                <div className="flex-row j-space img">
                  <span>
                    {Number(index + 1) ? `Week ${weeks[index + 1]} - ` : ''}{' '}
                    {title}
                  </span>
                  {(isAdmin || isTrainer) && full ? (
                    <>
                      {isAdmin && (
                        <Link
                          to={`/courses/editClass/${courseId}/${data.id}`}
                          className="edit"
                        >
                          Edit
                        </Link>
                      )}
                      {isTrainer &&
                        classResources[title].assignment &&
                        Array.isArray(classResources[title].assignment) && (
                          <Link
                            to={`/courses/add_assigment/${courseId}/${data.id}`}
                            className="edit"
                          >
                            Add Assignment
                          </Link>
                        )}
                    </>
                  ) : null}
                </div>
              </h2>
            </div>
          }
        >
          <div className={`cx_lis-content ${full ? ' full' : ''}`}>
            <div className="inf_x">
              {/* <h3>{title}</h3> */}
              <p>{description}</p>
            </div>

            {showResources ? (
              <div className="btns">
                <div>
                  <ResourceBtn
                    img={play}
                    text="Join Class"
                    color="theme"
                    link={link}
                  />
                </div>
                <div className="reg_text">
                  <h4>Resources</h4>
                  <div className="btn_sec_con flex-row j-start">
                    <div className="btn_sec">
                      <ResourceBtn
                        img={assignment}
                        text="Assignment"
                        color="off"
                        link=""
                        handleClick={viewAssignment}
                      />
                    </div>

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
                to={`/courses/classroom/${courseId}/${data.id}`}
              >
                View full outline
              </Link>
            ) : null}
          </div>
        </RevielDrop>

        {!isStudent ? (
          <RevielDrop open={showResourceDrop}>
            <div className="class_file_con">
              <div className="box-shade">
                <h3>Class assignment</h3>
                <Files
                  files={
                    dropType === 'resource'
                      ? classResources[title].files
                      : classResources[title].assignment && [
                          classResources[title].assignment,
                        ]
                  }
                  view={viewFile}
                  download={download}
                  showdrag={
                    dropType === 'resource'
                      ? true
                      : !!!classResources[title].files
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
                view={viewFile}
                download={download}
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
    </>
  );
}
export default Classes;
