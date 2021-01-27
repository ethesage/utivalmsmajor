import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import getCurrencyRate from "Hooks/getConvertionRate";
import Image from "../../components/Image";
import { purchaseCourse } from "../../g_actions/courses";
import "./style.scss";

const CourseCard = ({ data, size = "" }) => {
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
    classname = "",
    type,
    currency_type,
  } = data;

  const cousrecard = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  const [loading, rate] = getCurrencyRate();

  useEffect(() => {
    const position = () => {
      const smallerScreen = window.matchMedia("(max-width: 1000px)");

      if (smallerScreen.matches) {
        cousrecard.current.classList.add("smaller");
      } else {
        cousrecard.current.classList.remove("smaller");
      }
    };

    position();

    window.addEventListener("resize", position);

    return () => {
      window.removeEventListener("resize", position);
    };
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(purchaseCourse(data));
    history.push(`/purchase/${CourseCohorts[0].id}`);
  };

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
          <p className="clipped-text" style={{ "--number": 4 }}>
            {description}
          </p>
          <div className="c_inf flex-row j-space">
            <small>{duration} Weeks</small>
            <small>
              {"> "}
              {level}
            </small>
            <small>{value}</small>
          </div>
          <a href={learnMore} target="_" className="ext">
            Learn More
          </a>
        </div>
        <div className="en_rl flex-row j-space">
          {!loading && (
            <div className="cst">
              {currency_type === "local" ? (
                <>
                  <p>
                    {type === "free" ? "Free" : `₦ ${cost.toLocaleString()}`}
                  </p>
                  {type !== "free" && (
                    <small>${Math.round(cost / rate.USD_NGN)}</small>
                  )}
                </>
              ) : (
                <>
                  {type !== "free" && <p>${Math.round(cost / rate.USD_NGN)}</p>}
                  <small>
                    {type === "free" ? "Free" : `₦ ${cost.toLocaleString()}`}
                  </small>
                </>
              )}
            </div>
          )}

          <div className="link btn">
            <Link to="/" onClick={handleClick}>
              {user && data?.StudentCourses?.length > 0
                ? "View Course"
                : "Enroll Now"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
