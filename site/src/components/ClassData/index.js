import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import calender from 'assets/icons/calender.png';
import Editor from 'components/Editor';
import Live from 'assets/icons/class/live';
import { deleteClass } from 'g_actions/admin';
// import Video from 'assets/icons/class/video';
// import Slide from 'assets/icons/class/slide';
import lock from 'assets/icons/padlock.png';
import { LoaderSlim } from 'components/Loaders';
import { axiosInstance, errorhandler } from 'helpers';
import Modal from 'components/Modal';
import Confirm from 'components/Confirm';

let fakeClassData = JSON.stringify({
  time: 1622221202736,
  blocks: [
    {
      type: 'paragraph',
      data: {
        text: 'Hello Please note you havent completed payemnt',
      },
    },
    {
      type: 'paragraph',
      data: { text: 'You seem to know what you are doing' },
    },
    {
      type: 'paragraph',
      data: {
        text: '- Try and complete your payment to move on Thanks',
      },
    },
  ],
  version: '2.19.3',
});

const ClassData = ({
  data,
  currentCourse,
  index,
  cohortId,
  courseId,
  completedPayment,
}) => {
  const [loadRemoveClass, setLoadRemoveClass] = useState(false);
  const removeClassRef = useRef();
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const classId = data.id;

  const list_desc =
    currentCourse?.list_desc || currentCourse?.Course?.list_desc;

  const { title, description, CohortClassDays } = data;

  const { isAdmin } = useSelector((state) => state.auth);

  const date = CohortClassDays[0]?.date;
  const time = CohortClassDays[0]?.date;

  const remove_class = () => {
    removeClassRef.current.open();
  };

  const removeClass = async () => {
    setLoadRemoveClass(true);

    const courseName = currentCourse?.name || currentCourse?.Course?.name;

    try {
      await axiosInstance.delete(`/class/${classId}`);

      dispatch(deleteClass(courseName, classId));
      return true;
    } catch (err) {
      errorhandler(addToast, err, 'Error Removing Classs');

      setLoadRemoveClass(false);
    }
  };

  return loadRemoveClass ? (
    <div className="mb-10">
      <LoaderSlim height={5} width="1/2" />
      <LoaderSlim height={44} width="full" />
    </div>
  ) : (
    <Link
      className="view bg-white block rounded-md overflow-hidden mb-10 border-b-4 border-secondary relative"
      to={
        isAdmin
          ? `/admin/courses/classroom/${courseId}/${cohortId}/${data.id}`
          : `/courses/classroom/${courseId}/${data.id}`
      }
    >
      {!completedPayment && (
        <div
          className="absolute w-full h-full top-0 left-0 flex-center flex-col bg-gray-50 z-10"
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255, 0.3)',
          }}
        >
          <img src={lock} alt="lock" className="" />

          <div className="text-theme flex flex-col items-center mt-3">
            <small>This content is locked</small>
            <small>Complete your payment to access it</small>
          </div>
        </div>
      )}

      {!completedPayment ? (
        <div className="w-full p-7">
          <span className="inline-block mb-5 text-theme">
            {Number(index + 1) ? `${list_desc} ${index + 1}` : ''}
          </span>

          <div className="mb-10">
            <h4 className="mb-6 font-bold">Hi there</h4>

            <Editor
              key={title}
              readOnly={true}
              data={fakeClassData}
              mode="no-edit"
            />
          </div>

          <div className="flex justify-between w-full">
            <div className="flex items-center bg-approved_lg text-theme text-sm p-3">
              {!!CohortClassDays[0] && (
                <>
                  {' '}
                  <img
                    src={calender}
                    alt="Calender"
                    className="object-contain w-5"
                  />
                  <span className="inline-block mx-3">
                    {moment(date).format('DD/MM/YYYY')}
                  </span>
                  <span className="uppercase">
                    {moment(time).format('HH:MM a')}
                  </span>{' '}
                </>
              )}
            </div>

            <div className="text-gray-400 flex text-sm items-center">
              <Live className="fill-current mr-5" /> <p>Video</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full p-7 class-data-card">
          <span className="inline-block mb-5 text-theme">
            {Number(index + 1) ? `${list_desc} ${index + 1}` : ''}
          </span>

          <div className="mb-10">
            <div className="mb-6 flex flex-col md:flex-row justify-between">
              <h4 className="font-bold mb-3 md:mb-0">{title}</h4>

              {isAdmin && (
                <div className="remove-class">
                  <button
                    className="text-white bg-secondary px-3 py-1 rounded-sm text-sm"
                    onClick={remove_class}
                  >
                    Remove class
                  </button>
                </div>
              )}
            </div>
            <Editor
              key={title}
              readOnly={true}
              data={description}
              mode="no-edit"
            />
          </div>

          <div className="flex justify-between w-full">
            <div className="flex items-center bg-approved_lg text-theme text-sm p-3">
              {!!CohortClassDays[0] && (
                <>
                  {' '}
                  <img
                    src={calender}
                    alt="Calender"
                    className="object-contain w-5"
                  />
                  <span className="inline-block mx-3">
                    {moment(date).format('DD/MM/YYYY')}
                  </span>
                  <span className="uppercase">
                    {moment(time).format('HH:MM a')}
                  </span>
                </>
              )}
            </div>

            <div className="text-gray-400 flex text-sm items-center">
              <Live className="fill-current mr-5" /> <p>Video</p>
            </div>
          </div>
        </div>
      )}

      <Modal ref={removeClassRef}>
        <Confirm
          text="Are you sure?"
          onClick={removeClass}
          close={() => removeClassRef.current.close()}
          closeText="Successfuly Deleted"
        />
      </Modal>
    </Link>
  );
};

export default ClassData;
