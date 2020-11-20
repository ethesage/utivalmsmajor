import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import './style.scss';

const CourseCard = ({ data, size = '' }) => {
  const {
    thumbnail,
    name,
    description,
    duration,
    value,
    cost,
    level,
    learnMore,
    CourseCohorts,
    studentCourse,
    classname = '',
  } = data;

  const cousrecard = useRef();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const position = () => {
      const smallerScreen = window.matchMedia('(max-width: 1000px)');

      if (smallerScreen.matches) {
        cousrecard.current.classList.add('smaller');
      } else {
        cousrecard.current.classList.remove('smaller');
      }
    };

    position();

    window.addEventListener('resize', position);

    return () => {
      window.removeEventListener('resize', position);
    };
  }, []);

  return (
    <div className={`cl_crd smaller ${size} ${classname}`} ref={cousrecard}>
      <div className="img-sec">
        <Image
          key={thumbnail}
          image={thumbnail}
          usePlaceHolder={true}
          lazyLoad={true}
          imgClass="img cover"
          alt={name}
        />
      </div>
      <div className="text_cont flex-col al-start">
        <div className="text-sec">
          <h2>{name}</h2>
          <p className="clipped-text" style={{ '--number': 4 }}>
            {description}
          </p>
          <div className="c_inf flex-row j-space">
            <small>{duration} Weeks</small>
            <small>
              {'> '}
              {level}
            </small>
            <small>{value}</small>
          </div>
          <a href={learnMore} target="_" className="ext">
            Learn More
          </a>
        </div>
        <div className="en_rl flex-row j-space">
          <div className="cst">
            <p>N{cost.toLocaleString()}</p>{' '}
            <small>${Math.round(cost / 380)}</small>
          </div>

          <div className="link btn">
            {user ? (
              studentCourse?.length > 0 ? (
                <Link to={`/courses/overview/${CourseCohorts[0].id}`}>
                  View Course
                </Link>
              ) : (
                <Link to={`/purchase/${CourseCohorts[0].id}`} state={data}>
                  Enroll Now
                </Link>
              )
            ) : (
              <Link to={`/auth/quickcheckout/${CourseCohorts[0].id}`}>
                Enroll Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
