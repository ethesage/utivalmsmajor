import React, { useEffect } from 'react';
import Sekeleton from 'react-skeleton-loader';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getNextClasses } from 'views/Dashboard/Home/action';
import no_course from 'assets/dashboard/no_course.png';
import VideoIcon from 'assets/icons/video';
import './style.scss';

const ClassesSec = ({ data, idx }) => (
  <a
    href={data?.link}
    className={`bg-${
      idx % 2 === 0 ? 'v_light' : 'v_light_sec'
    } px-2 py-2 rounded-md mb-3`}
    target="_"
  >
    <div className="class_sec flex flex-row md:items-center w-full items-start">
      <div className="mr-3 bg-white p-3 rounded-full">
        <VideoIcon
          className={`fill-current text-${
            idx % 2 === 0 ? 'theme' : 'secondary'
          }`}
        />
      </div>
      <div className="flex flex-col md:flex-row lg:flex-col text-sm w-full justify-between">
        <h4 className="font-bold clipped-text" style={{ '--number': 1 }}>
          {data.name}
        </h4>
        <p className="info flex-row j-start mt-2 md:mt-0">
          <Moment format="Do MMMM YYYY">{data?.date}</Moment>
          {' | '}
          <time>{moment(data?.time, 'HH:mm').format('hh:mm A')}</time>
        </p>
      </div>
    </div>
  </a>
);

const Loader = () => (
  <div className="next_class" style={{ height: '100px', marginRight: '30px' }}>
    <Sekeleton width="120%" height="100%" />
  </div>
);

const Classes = ({ isStudent }) => {
  const dispatch = useDispatch();
  const nextclasses = useSelector((state) => state.home.nextclasses);

  useEffect(() => {
    if (!nextclasses) {
      (async () => {
        await dispatch(getNextClasses(isStudent ? 'student' : 'trainer'));
      })();
    }
    return () => {};
  }, [nextclasses, dispatch, isStudent]);

  return (
    <div className="mb-16 -mx-3.5 flex flex-wrap w-full">
      <div className="px-3.5 w-full lg:max-w-1/2 xl:max-w-2/5">
        <div className="flex flex-col bg-white rounded-md p-4 w-full">
          {!nextclasses ? (
            [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
          ) : nextclasses.length === 0 ? (
            <NoClass />
          ) : (
            <>
              <h2 className="mb-5">Next Live Class</h2>

              <div className="overflow-auto max-h-56 flex flex-col">
                {nextclasses.map((nextclass, i) => {
                  return (
                    !!nextclass && (
                      <ClassesSec
                        key={`next_classes_${i}`}
                        data={nextclass}
                        idx={i}
                      />
                    )
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="px-3.5 w-full lg:max-w-1/2 mt-10 lg:mt-0">
        <div className="flex flex-col bg-white rounded-md p-4 flex-grow w-full">
          {!nextclasses ? (
            [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
          ) : nextclasses.length === 0 ? (
            <NoClass />
          ) : (
            <>
              <h2 className="mb-5">Assignments</h2>

              <div className="overflow-auto max-h-56 flex flex-col">
                {nextclasses.map((nextclass, i) => {
                  return (
                    !!nextclass && (
                      <ClassesSec
                        key={`next_classes_${i}`}
                        data={nextclass}
                        idx={i}
                      />
                    )
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function NoClass() {
  return (
    <div className="next_class flex-row ">
      <img src={no_course} alt="" className="" />
      <div className="text-sec flex-col">
        <h2>You have no new classes</h2>
      </div>
    </div>
  );
}

export default Classes;
