import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ResourceBtn from 'components/ResourceButton';
import Classes from 'components/Classes';
import assignmentIcon from 'assets/icons/course/assignment.png';
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
  getStudentSubmittedAssignments,
} from 'g_actions/member';
import { useToasts } from 'react-toast-notifications';
import Button from 'components/Button';
import 'components/ViewGrade/style.scss';
import { axiosInstance, s3url, toBase64, uploadProgress } from 'helpers';
import './style.scss';

const Assignment = ({ gapi }) => {
  const { courseId, classroom, assignmentId } = useParams();
  const { addToast } = useToasts();

  const dispatch = useDispatch();
  const enrolledcourses = useSelector((state) => state.member.enrolledcourses);
  const currentCourse = useSelector((state) => state.member.currentCourse);
  const { user } = useSelector((state) => state.auth);
  const { classResources } = useSelector((state) => state.member);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState();
  const length = useRef();

  const modalRef = useRef();

  useEffect(() => {
    if (currentCourse) return;

    dispatch(
      getEnrolledCourses(
        courseId,
        enrolledcourses.find((course) => course.courseCohortId === courseId),
        user.role,
        user
      )
    );

    return () => {};
  }, [enrolledcourses, courseId, currentCourse, dispatch, user]);

  const currentClass = currentCourse?.Course?.Classes.find(
    (classrum) => classrum.id === classroom
  );

  const assignment = currentClass?.ClassResources?.filter(
    (res) => res.type === 'assignment'
  );

  const assignmentFile =
    classResources &&
    currentClass &&
    classResources[currentClass.title].assignments[0];

  useEffect(() => {
    if (!currentClass) return;

    (async () => {
      await dispatch(
        getStudentSubmittedAssignments(
          currentClass.title,
          currentClass.id,
          currentCourse?.courseCohortId,
          currentCourse.Course.name,
          currentCourse.Cohort.cohort,
          user
        )
      );
    })();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass]);

  const upload = async (files) => {
    setDeleteDialog(false);
    modalRef.current.open();

    const fileName = files.name;
    const path = `Courses/${currentCourse.Course.name}/cohorts/${currentCourse.Cohort.cohort}/submitted-assignments/${user.id}`;

    const file = await toBase64(files);

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

      const res = await axiosInstance.post('assignment/submit', {
        classId: currentClass.id,
        classResourcesId: assignment[0].id,
        resourceLink: fileName,
        courseCohortId: currentCourse?.courseCohortId,
        size: files.size.toString(),
      });

      if (res) {
        dispatch(
          getSubmittedAssignments(currentClass.title, {
            isGraded: false,
            resourceId: res.data.data.id,
            comments: null,
            Key: `${path}/${fileName}`,
            Size: files.size,
          })
        );
      }
    } catch (err) {
      axiosInstance.delete(
        `/file?path=${encodeURIComponent(`${path}/${fileName}`)}`
      );

      addToast('Error Uploading file', {
        appearance: 'error',
        autoDismiss: true,
      });
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
    ].submittedAssignment.find((file) => file.Key === currentFile);

    try {
      const res = await axiosInstance.delete(
        `assignment/${resource.resourceId}`
      );
      if (res) {
        dispatch(deleteSubmittedAssignment(currentClass.title, currentFile));
        await gapi.gapi.deleteFile(currentFile);
        setCurrentFile(null);

        return true;
      }
    } catch (err) {
      addToast('Error Deleting file', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const deleteFIle = (file) => {
    setDeleteDialog(true);
    setCurrentFile(file);
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
                assData={assignment}
                open={true}
                showArrow={false}
                full={true}
                showResources={false}
                completedPayment={
                  currentClass && !(Object.keys(currentClass).length === 3)
                }
                courseCohortId={currentCourse.courseCohortId}
              />
              <div className="btn_sec_con flex-row j-start">
                <div className="btn_sec">
                  <ResourceBtn
                    img={assignmentIcon}
                    text="Download Assignment"
                    color="off"
                    link={`/${s3url}/${assignmentFile.Key}`}
                    attr={{ download: true }}
                    useLink={false}
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
          classResources[currentClass.title].submittedAssignment && (
            <ViewGrade
              data={classResources[currentClass.title].submittedAssignment.find(
                (ass) => ass.id === assignmentId
              )}
              length={length.current}
              assignmentId={assignmentId}
              currentClass={currentClass}
              // view={viewAss}
            />
          )
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
