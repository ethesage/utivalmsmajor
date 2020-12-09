import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-skeleton-loader';
import Moment from 'react-moment';
import moment from 'moment';
import { getNextClasses } from 'views/Dashboard/Home/action';
import Button from '../Button';
import calender from 'assets/dashboard/calendar.png';
import clock from 'assets/dashboard/clock.png';
import no_course from 'assets/dashboard/no_course.png';
import './style.scss';

const ClassesSec = ({ data }) => {
  return (
    <div className="next_class_staff flex-row al-start j-space">
      <img src={data.thumbnail} alt="" className="main_img" />
      <div className="text-sec">
        <h2>HR Analtytics</h2>

        <div className="info_sec">
          {/* <div className="info flex-row j-start">
            <img src={week} alt="" /> <p>Week 2</p>
          </div> */}
          <div className="info flex-row j-start">
            <img src={calender} alt="" />{' '}
            <p>
              <Moment format="Do MMMM YYYY">{data.date}</Moment>
            </p>
          </div>
          <div className="info flex-row j-start">
            <img src={clock} alt="" />{' '}
            <p>
              <time>{moment(data.time, 'HH:mm').format('hh:mm A')}</time>
            </p>
          </div>
        </div>

        <Button
          className="p_btn short flex-row"
          link="/courses"
          text="Start Class"
        />
      </div>
    </div>
  );
};

const Classes = () => {
  const dispatch = useDispatch();
  const nextclasses = useSelector((state) => state.home.nextclasses);

  useEffect(() => {
    if (!nextclasses) {
      (async () => {
        await dispatch(getNextClasses('trainer'));
      })();
    }
    return () => {};
  }, [nextclasses, dispatch]);

  const Loader = ({ height }) => <Skeleton width="100%" height={height} />;

  return (
    <div className="info_con scrolled flex-col al-start j-start">
      {!nextclasses ? (
        <div className="next_cl flex-col">
          {['10px', '30px', '50px'].map((height) => (
            <Loader key={`load_${height}`} height={height} />
          ))}
        </div>
      ) : nextclasses.length === 0 ? (
        <NoClass />
      ) : (
        nextclasses.map((nextclass, i) => (
          <ClassesSec key={`next_classes_${i}`} data={nextclass} />
        ))
      )}
    </div>
  );
};

function NoClass() {
  return (
    <div className="next_cl flex-col ">
      <img src={no_course} alt="" className="" />
      <div className="text-sec flex-col">
        <h2>You have no new classes</h2>
      </div>
    </div>
  );
}

export default Classes;
