import React, { useEffect } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getNextClasses } from 'views/Dashboard/Home/action';
import VideoIcon from 'assets/icons/video';
import Clock from 'assets/icons/clock';
import './style.scss';

const ClassesSec = ({ data, idx }) => (
  <a
    href={data?.link}
    className={`bg-${
      idx % 2 === 0 ? 'v_light' : 'v_light_sec'
    } px-2 py-2 rounded-md mb-3 shadow`}
    target="_"
  >
    <div className="class_sec flex flex-row items-center w-full relative">
      <div className="mr-3 bg-white p-3 rounded-full">
        <VideoIcon
          className={`fill-current text-${
            idx % 2 === 0 ? 'theme' : 'secondary'
          }`}
        />
      </div>
      <div className="w-full">
        <p
          className="absolute -top-1 right-0"
          style={{
            fontSize: '10px',
          }}
        >
          <Moment format="Do MMMM YYYY">{data?.date}</Moment>
          {' | '}
          <time>{moment(data?.time, 'HH:mm').format('hh:mm A')}</time>
        </p>
        <h4 className="text-xs font-bold">{data.name}</h4>
      </div>
    </div>
  </a>
);

const AssignmentSec = ({ data, idx }) => (
  <a
    href={data?.link}
    className={`bg-${
      idx % 2 === 0 ? 'v_light' : 'v_light_sec'
    } px-2 py-2 rounded-md mb-3 shadow`}
    target="_"
  >
    <div className="class_sec flex flex-row md:items-center w-full items-start">
      <div className="mr-3 p-2 bg-white overflow-hidden w-14 h-14 flex-shrink-0 rounded-md">
        <img
          className="w-full h-full"
          alt={data.name}
          src="https://utiva-app.s3.amazonaws.com/thumbnail-+AI+Chatbot+for+Business"
        />
      </div>
      <div className="flex flex-col w-full justify-between">
        <h4 className="font-bold text-sm ">Understanding How Data Works</h4>

        <p className="info text-xs flex items-center mt-2">
          {idx === 1 ? (
            <>
              <Clock className="mr-2 w-4 h-4 fill-current text-red-500" />{' '}
              <span className="text-red-500">Today</span>
            </>
          ) : (
            <Moment format="Do MMMM">{data?.date}</Moment>
          )}
        </p>
      </div>
    </div>
  </a>
);

const Loader = () => (
  <div className="border border-v_light px-2 py-2 rounded-md mb-3 shadow">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-v_light h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-2 bg-v_light rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-v_light rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

const Loader2 = () => (
  <div className="border border-v_light px-2 py-2 rounded-md mb-3 shadow">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-md bg-v_light h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="space-y-2">
          <div className="h-4 bg-v_light rounded"></div>
        </div>
        <div className="h-4 bg-v_light rounded w-3/4"></div>
      </div>
    </div>
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
    <section className="-m-3.5 mb-16">
      <div className="flex flex-wrap w-full">
        <div className="p-3.5 w-full max-w-md">
          <div className="flex flex-col bg-white rounded-md p-6 w-full">
            <h2 className="mb-5">Next Live Class</h2>

            <div className="overflow-auto h-64 flex flex-col">
              {!nextclasses ? (
                [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
              ) : nextclasses.length === 0 ? (
                <NoClass text="No live classes yet" />
              ) : (
                nextclasses.map((nextclass, i) => {
                  return (
                    !!nextclass && (
                      <ClassesSec
                        key={`next_classes_${i}`}
                        data={nextclass}
                        idx={i}
                      />
                    )
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="p-3.5 w-full max-w-3xl">
          <div className="flex flex-col bg-white rounded-md p-6 flex-grow w-full">
            <h2 className="mb-5">Assignments</h2>

            <div className="overflow-auto h-64 flex flex-col">
              {!nextclasses ? (
                [1, 2, 3].map((i) => <Loader2 key={`load_${i}`} />)
              ) : nextclasses.length === 0 ? (
                <NoClass text="No Assigment given yet" />
              ) : (
                nextclasses.map((nextclass, i) => {
                  return (
                    !!nextclass && (
                      <AssignmentSec
                        key={`next_classes_${i}`}
                        data={nextclass}
                        idx={i}
                      />
                    )
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function NoClass({ text }) {
  return (
    <div className="flex-center w-full h-full">
      <h2>{text}</h2>
    </div>
  );
}

export default Classes;
