import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResourceBtn from 'components/ResourceButton';
import Classes from 'components/Classes';
import assignment from 'assets/icons/course/assignment.png';
import Confirm from 'components/Confirm';
import { getEnrolledCourses } from 'g_actions/member';
import Loader from 'components/Loading';
import Files from 'components/Files';
import Modal from 'components/Modal';
import ProgressBar from 'components/ProgressBar';
import ViewGrade from 'components/ViewGrade';
import {
  getSubmittedAssignments,
  deleteSubmittedAssignment,
} from 'g_actions/member';
import { useToasts } from 'react-toast-notifications';
import Button from 'components/Button';
import 'components/ViewGrade/style.scss';
import { axiosInstance } from 'helpers';
import './style.scss';

const Assignment = ({ gapi }) => {
  const { courseId, classroom, assignmentId } = useParams();
  const { addToast } = useToasts();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { classResources } = useSelector((state) => state.member);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFileId, setCurrentFileId] = useState();
  const length = useRef();

  const modalRef = useRef();

  useEffect(() => {
    if (currentCourse) return;

    dispatch(
      getEnrolledCourses(
        courseId,
        enrolledcourses.find((course) => course.courseCohortId === courseId)
      )
    );

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch]);

  const currentClass = currentCourse?.Course?.Classes.find(
    (classrum) => classrum.id === classroom
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
    if (!currentClass) return;
    if (classResources[currentClass.title].submittedAssignment) return;

    (async () => {
      const response = await axiosInstance.get(
        `assignment/class/student/${currentClass.id}/${currentClass?.courseCohortId}`
      );

      const submitted = response.data.data;
      if (typeof submitted !== Array && submitted?.length === 0) {
        dispatch(getSubmittedAssignments(currentClass.title, null));
        return;
      }

      length.current = submitted?.length;

      submitted &&
        submitted.forEach(async (resource) => {
          const file = await getFiles(resource.resourceLink);
          dispatch(
            getSubmittedAssignments(currentClass.title, {
              ...resource,
              resourceId: resource.id,
              ...file,
              comments: null,
            })
          );
        });
    })();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass]);

  const download = async (e) => {
    e.preventDefault();

    if (!currentClass) return;
    if (!classResources[currentClass.title].assignment) return;
    window.open(
      classResources[currentClass.title].assignment[0].webViewLink ||
        classResources[currentClass.title].assignment[0].webContentLink
    );
  };

  const viewAss = async (e) => {
    e.preventDefault();

    if (!currentClass) return;
    if (!classResources[currentClass.title].assignment) return;
    window.open(
      classResources[currentClass.title].assignment.webViewLink ||
        classResources[currentClass.title].assignment.webContentLink
    );
  };

  // const err = Array.isArray(error.message)
  // ? error.message.join(', ')
  // : error.message;

  const upload = async (files) => {
    setDeleteDialog(false);
    const assignment_ = currentClass.ClassResources.filter(
      (res) => res.type === 'assignment'
    )[0].id;

    modalRef.current.open();
    let file = await gapi.gapi.upload(
      files,
      setProgress,
      currentCourse.CourseCohort.folderId
    );

    try {
      const res = await axiosInstance.post('assignment/submit', {
        classId: currentClass.id,
        classResourcesId: assignment_,
        resourceLink: file.id,
        courseCohortId: currentClass?.courseCohortId,
      });
      if (res) {
        file = await getFiles(file.id);
        file.isGraded = false;
        file.resourceId = res.data.data.id;
        file.comments = null;

        dispatch(getSubmittedAssignments(currentClass.title, file));
      }
    } catch (err) {
      addToast('Error Deleting File', {
        appearance: 'error',
        autoDismiss: true,
      });

      await gapi.gapi.deleteFile(file.id);
    }
  };

  const open = () => {
    modalRef.current.open();
  };

  const close = () => {
    modalRef.current.close();
  };

  const deleteAssignment = async () => {
    const resource = classResources[
      currentClass.title
    ].submittedAssignment.find((file) => file.id === currentFileId);

    try {
      const res = await axiosInstance.delete(
        `assignment/${resource.resourceId}`
      );
      if (res) {
        dispatch(deleteSubmittedAssignment(currentClass.title, currentFileId));
        await gapi.gapi.deleteFile(currentFileId);
        setCurrentFileId(null);

        return true;
      }
    } catch (err) {
      addToast('Error submitting', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const deleteFIle = (id) => {
    setDeleteDialog(true);
    setCurrentFileId(id);
    open();
  };

  return (
    <>
      {currentCourse ? (
        !assignmentId ? (
          <div className="asx flex-row j-start al-start">
            <div className="asx_sec">
              <Classes
                data={currentClass}
                assData={classResources[currentClass.title].assignment}
                open={true}
                showArrow={false}
                full={true}
                showResources={false}
                gapi={gapi}
              />
              <div className="btn_sec_con flex-row j-start">
                <div className="btn_sec">
                  <ResourceBtn
                    img={assignment}
                    text="Download Assignment"
                    color="off"
                    link=""
                    handleClick={download}
                  />
                </div>
              </div>
            </div>

            <div className="upload">
              <h3>Your Assignments</h3>
              <div className="box-shade">
                <Files
                  files={classResources[currentClass.title].submittedAssignment}
                  personal={true}
                  deleteFile={deleteFIle}
                  handleImage={upload}
                  linkExt={{ courseId, classroom }}
                >
                  <Button text="Submit" className="up_btn flex-row mx-auto" />
                </Files>
              </div>
            </div>

            <Modal ref={modalRef}>
              {deleteDialog ? (
                <Confirm
                  text="Are you sure?"
                  onClick={deleteAssignment}
                  close={close}
                  closeText="Successfuly Deleted"
                />
              ) : (
                <ProgressBar progress={progress} />
              )}
            </Modal>
          </div>
        ) : (
          <ViewGrade
            data={classResources[currentClass.title].submittedAssignment}
            length={length.current}
            assignmentId={assignmentId}
            currentClass={currentClass}
            view={viewAss}
          />
        )
      ) : (
        <div className="flex-row img">
          <Loader tempLoad={true} full={false} />
        </div>
      )}
    </>
  );
};

export default Assignment;
