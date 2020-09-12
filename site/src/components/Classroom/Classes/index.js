import React, { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAssignments, getResources } from 'g_actions/student';
import { weeks } from 'helpers';
import play from 'assets/icons/course/play.png';
import material from 'assets/icons/course/material.png';
import assignment from 'assets/icons/course/assignment.png';
import class_icon from 'assets/icons/class_icon.png';
import Modal from '../../Modal';
import Files from 'components/Files';
import ResourceBtn from '../../ResourceButton';
import RevielDrop from '../../RevielDrop';
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
}) {
  const { title, description, link } = data;
  const { isTrainer } = useSelector((state) => state.auth);
  const { classResources } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const modalRef = useRef();

  const resources = data.ClassResouces.filter((res) => res.type === 'resource');
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
    if (classResources[title].files.length === 0)
      resources.forEach(async (resource) => {
        console.log(resource.link);
        const file = await getFiles(resource.link);
        dispatch(getResources(title, file));
      });

    return () => {};
  }, []);

  useEffect(() => {
    if (!classResources[title].assignment)
      assignment_.forEach(async (resource) => {
        console.log(resource.link);
        const file = await getFiles(resource.link);
        dispatch(getAssignments(title, file));
      });

    return () => {};
  }, []);

  const viewResources = (e) => {
    e.preventDefault();
    modalRef.current.open();
  };

  const viewFile = async (contentLink) => {
    window.open(contentLink, '_blank');
  };

  const download = async (contentLink) => {
    window.open(contentLink);
  };

  // const upload = async (files, folderId) => {
  //   modalRef.current.open();
  //   gapi.gapi.upload(files, setProgress, '1F0r-bTgMLTkUhBf2o-ZTwtCPB3dWfnXp');
  // };

  return (
    <div className="cx_listnx_con">
      <RevielDrop
        open={open}
        showArrow={showArrow}
        header={
          <div className="cx_header flex-row j-space">
            <h2 className={`h_con flex-row j-start ${full ? ' full' : ''}`}>
              <img src={class_icon} alt="class" />{' '}
              <span>
                Week {weeks[index + 1]} - {title}
              </span>
              {isTrainer && full ? (
                <Link to={`/courses/editClass/${data.id}`} className="edit">
                  Edit
                </Link>
              ) : null}
            </h2>
          </div>
        }
      >
        <div className={`cx_lis-content ${full ? ' full' : ''}`}>
          <div className="inf_x">
            <h3>{title}</h3>
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
                      img={material}
                      text="Download Materials"
                      color="secondary"
                      link=""
                      handleClick={viewResources}
                    />
                  </div>
                  <div className="btn_sec">
                    <ResourceBtn
                      img={assignment}
                      text="Assignment"
                      color="off"
                      link=""
                      handleClick={(e) => {
                        e.preventDefault();
                        viewFile(
                          classResources[title].assignment &&
                            classResources[title].assignment.webViewLink
                        );
                      }}
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
    </div>
  );
}
export default Classes;
