import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sekeleton from 'react-skeleton-loader';
import Moment from 'react-moment';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getNextClasses } from 'views/Dashboard/Home/action';
import img from 'assets/homepage/img1.png';
import calender from 'assets/dashboard/calendar.png';
import clock from 'assets/dashboard/clock.png';
import no_course from 'assets/dashboard/no_course.png';
import './style.scss';

const ClassesSec = ({ data: { thumbnail, link, name, time, date } }) => (
  <Link to={link} className="next_class flex-row al-start j-space">
    <img src={thumbnail} alt="" className="main_img" />
    <div className="text-sec flex-col j-space al-start">
      <h2>{name}</h2>

      <div className="info_sec ">
        <strong>
          <small>Next class</small>
        </strong>
        <div className="info flex-row j-start">
          <img src={calender} alt="" />{' '}
          <p>
            <Moment format="DD-MM-YYYY">{date}</Moment>
          </p>
        </div>
        <div className="info flex-row j-start">
          <img src={clock} alt="" />{' '}
          <p>
            <time>{moment(time, 'HH:mm').format('hh:mm A')}</time>
          </p>
        </div>
      </div>
    </div>
  </Link>
);

const Loader = () => (
  <div className="next_class">
    <Sekeleton width="120%" height="100%" />
  </div>
);

const NoClass = () => (
  <div className="next_class flex-row ">
    <img src={no_course} alt="" className="" />
    <div className="text-sec flex-col">
      <h2>You have no new classes</h2>
    </div>
  </div>
);

const Classes = () => {
  const dispatch = useDispatch();
  const nextclasses = useSelector((state) => state.home.nextclasses);

  useEffect(() => {
    if (!nextclasses) {
      (async () => {
        await dispatch(getNextClasses());
      })();
    }
    return () => {};
  }, [nextclasses, dispatch]);

  return (
    <div className="p_sec flex-row j-space">
      {!nextclasses ? (
        [1, 2, 3].map((i) => <Loader key={`load_${i}`} />)
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

export default Classes;
