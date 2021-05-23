import { Link } from 'react-router-dom';
import { Progress } from 'react-sweet-progress';
import medal from 'assets/icons/medal.png';
import 'react-sweet-progress/lib/style.css';
import { filterDate } from 'helpers';
import moment from 'moment';

const MainCourse = ({ data }) => {
  const { CourseCohort, Course, Cohort, progress } = data;

  const dateData = {
    startDate: filterDate(CourseCohort?.dateRange).startDate,
    endDate: filterDate(CourseCohort?.dateRange).endDate,
  };
  const precentageProgress = (progress ? progress : 0) + '%';

  return (
    <div className="p-3.5 w-full sm:max-w-1/2 md:max-w-1/3 xl:max-w-1/4 ">
      <Link
        className="rounded-md shadow-md overflow-hidden block"
        to={`/courses/overview/${CourseCohort?.id}`}
      >
        <div
          className="h-32"
          style={{
            backgroundImage: `url(${Course.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="p-4 pt-7 w-full text-gradient h-full flex items-end">
            <h3 className="theme-color text-white font-bold">{Course.name}</h3>
          </div>
        </div>

        <div className="bg-white txt-sec flex-col flex-grow p-4">
          <div className="chx flex-col al-start mb-3">
            <strong className="text-theme">
              {<p>{Cohort?.cohort} Cohort</p>}
            </strong>
            <small className="text-xs text-secondary">
              {moment(dateData?.startDate).format('MMM DD, YYYY')} -{' '}
              {moment(dateData?.endDate).format('MMM DD, YYYY')}
            </small>
          </div>

          <div className="w-full">
            <small className="text-xs">Completion level</small>
            <div className="flex items-center">
              <Progress
                className="slim"
                percent={progress ? progress : 0}
                status={
                  progress === 0
                    ? 'error'
                    : progress > 95
                    ? 'success'
                    : 'default'
                }
                theme={{
                  success: {
                    symbol: precentageProgress,
                    color: 'rgb(9, 172, 35)',
                  },
                  error: {
                    symbol: precentageProgress,
                    color: 'rgb(136, 16, 16)',
                  },
                  default: {
                    symbol: precentageProgress,
                    color: 'rgb(15, 7, 142)',
                  },
                }}
              />
              <small className="ml-3">{precentageProgress}</small>
            </div>
          </div>

          <div className="text-xs mt-5">
            {progress === 100 ? (
              <div className="flex items-center">
                <img src={medal} alt="Complete" className="mr-3" />
                <p>Completed</p>
              </div>
            ) : (
              <p>Ongoing</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MainCourse;
