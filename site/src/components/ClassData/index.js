import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import calender from 'assets/icons/calender.png';
import Editor from 'components/Editor';
import Live from 'assets/icons/class/live';
import Video from 'assets/icons/class/video';
import Slide from 'assets/icons/class/slide';

const ClassData = ({ data, currentCourse, index, cohortId, courseId }) => {
  const list_desc =
    currentCourse?.list_desc || currentCourse?.Course?.list_desc;

  const { title, description, CohortClassDays } = data;

  const { isAdmin } = useSelector((state) => state.auth);

  const date = CohortClassDays[0]?.date;
  const time = CohortClassDays[0]?.date;

  return (
    <Link
      className="view bg-white block rounded-md overflow-hidden mb-10 border-b-4 border-secondary"
      to={
        isAdmin
          ? `/admin/courses/classroom/${courseId}/${cohortId}/${data.id}`
          : `/courses/classroom/${courseId}/${data.id}`
      }
    >
      <div className="w-full p-7">
        <span className="inline-block mb-5 text-theme">
          {Number(index + 1) ? `${list_desc} ${index + 1}` : ''}
        </span>

        <div className="mb-10">
          <h4 className="mb-6 font-bold">{title}</h4>
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
                </span>{' '}
              </>
            )}
          </div>

          <div className="text-gray-400 flex text-sm items-center">
            <Live className="fill-current mr-5" /> <p>Video</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClassData;
