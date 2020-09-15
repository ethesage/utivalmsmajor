import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResourceBtn from '../ResourceButton';
import Classes from '../Classroom/Classes';
import assignment from 'assets/icons/course/assignment.png';
import Confirm from 'components/Confirm';
import { getEnrolledCourses } from 'g_actions/student';
import Loader from '../Loading';
import Files from 'components/Files';
import Modal from 'components/Modal';
import ProgressBar from 'components/ProgressBar';
import {
  getSubmittedAssignments,
  deleteSubmittedAssignment,
} from 'g_actions/student';
import { useToasts } from 'react-toast-notifications';
import Button from '../Button';
import '../Classroom/Classes/style.scss';
import { axiosInstance } from 'helpers';
import './style.scss';

const Assignment = ({ gapi }) => {
  const { courseId, classroom } = useParams();
  const { addToast } = useToasts();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.student.enrolledcourses);
  const currentCourse = useSelector((state) => state.student.currentCourse);
  const { classResources } = useSelector((state) => state.student);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFileId, setCurrentFileId] = useState();

  const modalRef = useRef();

  useEffect(() => {
    if (!enrolledcourses && !currentCourse)
      (async () => {
        await dispatch(getEnrolledCourses(courseId));
      })();

    return () => {};
  }, [dispatch, enrolledcourses, courseId, currentCourse]);

  useEffect(() => {
    if (!enrolledcourses) return;
    if (currentCourse) return;

    dispatch(
      getEnrolledCourses(
        courseId,
        enrolledcourses &&
          enrolledcourses.find((course) => course.id === courseId)
      )
    );

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch]);

  const currentClass =
    currentCourse &&
    currentCourse.CourseCohort.Classes.find(
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
        `assignment/class/student/${currentClass.id}`
      );

      const submitted = response.data.data;
      if (typeof submitted !== Array && submitted.length === 0) {
        dispatch(getSubmittedAssignments(currentClass.title, null));
        return;
      }

      submitted.forEach(async (resource) => {
        const file = await getFiles(resource.resourceLink);
        dispatch(
          getSubmittedAssignments(currentClass.title, {
            ...resource,
            resourceId: resource.id,
            ...file,
          })
        );
      });
    })();

    return () => {};
  }, [currentClass]);

  const download = async (e) => {
    e.preventDefault();

    if (!currentClass) return;
    if (!classResources[currentClass.title].assignment) return;
    window.open(
      classResources[currentClass.title].assignment.webContentLink ||
        classResources[currentClass.title].assignment.webViewLink
    );
  };

  const upload = async (files) => {
    const assignment_ = currentClass.ClassResouces.filter(
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
      });
      if (res) {
        file = await getFiles(file.id);
        file.isGraded = false;

        dispatch(getSubmittedAssignments(currentClass.title, file));
      }
    } catch (err) {
      addToast('Error submitting', {
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

  const viewFile = async (contentLink) => {
    window.open(contentLink, '_blank');
  };

  const deleteAssignment = async () => {
    const resource = classResources[
      currentClass.title
    ].submittedAssignment.find((file) => file.id === currentFileId);

    try {
      const res = await axiosInstance.delete(
        `assignment/submit/${resource.resourceId}`
      );
      if (res) {
        dispatch(deleteSubmittedAssignment(currentClass.title, currentFileId));
        await gapi.gapi.deleteFile(currentFileId);
      }
    } catch (err) {
      addToast('Error submitting', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
    setCurrentFileId(null);
  };

  const deleteFIle = (id) => {
    setDeleteDialog(true);
    setCurrentFileId(id);
    open();
  };

  return (
    <div className="asx flex-row j-start al-start">
      {currentCourse ? (
        <>
          <div className="asx_sec">
            <Classes
              data={currentClass}
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
                view={viewFile}
                personal={true}
                download={download}
                deleteFile={deleteFIle}
                handleImage={upload}
              >
                <Button text="Submit" className="up_btn flex-row mx-auto" />
              </Files>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-row img">
          <Loader tempLoad={true} full={false} />
        </div>
      )}
      <Modal ref={modalRef}>
        {deleteDialog ? (
          <Confirm
            text="Are you sure?"
            onClick={deleteAssignment}
            close={close}
          />
        ) : (
          <ProgressBar progress={progress} />
        )}
      </Modal>
    </div>
  );
};

export default Assignment;
