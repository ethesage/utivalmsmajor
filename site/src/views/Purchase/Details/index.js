import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Input from "../../../components/Input";
import category from "../../../data/categories";
import { check, checkoutCourse } from "../../../g_actions/courses";
import "./style.scss";

const course = category[0].data[0];

const Details = ({ proceed, match, set }) => {
  const { mappedCourses } = useSelector((state) => state.home);
  const { checkoutData } = useSelector((state) => state.courses);
  const { push } = useHistory();
  const [val, setVal] = useState(null);
  // console.log(!mappedCourses && match.params.courseCohortId === "null");

  if (!mappedCourses && match.params.courseCohortId === "null") push("/");

  const oo = mappedCourses?.find(
    (course) => course.courseCohortId === match.params.courseCohortId
  );

  if (!oo) push("/");

  // console.log(oo, "ooooo");

  const dispatch = useDispatch();

  const checkout = async () => {
    const value = await dispatch(check(match.params.courseCohortId));
    if (value.message === "Not Enrolled") {
      set(match.params.courseCohortId);
      proceed(1);
    } else push(`/courses/overview/${match.params.courseCohortId}`);
    // /
  };

  console.log(val && !checkoutData);

  useEffect(() => {
    if (!oo) push("/");
    if (!val) setVal(oo);
    (async () => {
      if (val && !checkoutData) {
        console.log("l");
        await dispatch(checkoutCourse(val));
      }
    })();
  });

  return (
    <div className="details">
      <div className="container">
        <div className="details_con mx-auto">
          <div className="img-sec flex-row j-end">
            <img src={oo?.img} alt={oo?.title} className="img cover" />
          </div>
          <div className="text-sec flex-col j-space al-start">
            <h2>{oo?.title}</h2>
            <p className="clipped-text" style={{ "--number": 4 }}>
              {oo?.desc}
            </p>
            <div className="c_inf flex-row j-space">
              <small>{oo?.duration} Weeks</small>
              <small>
                {"> "}
                {oo?.level}
              </small>
              <small>{oo?.value}</small>
            </div>
            <Link to={oo?.link} className="ext btn theme centered">
              <p>Learn More</p>
            </Link>
            {/* <Button /> */}
          </div>
          <div className="summary flex-row j-start">
            <div className="contents">
              <div className="cost-analysis">
                <div className="flex-row j-space">
                  <p>Price</p>
                  <p>${Math.round(oo?.cost / 380)}</p>
                </div>
                <div className="flex-row j-space">
                  <p>Discount</p>
                  <p>-</p>
                </div>
                <div className="flex-row j-space theme-color strong">
                  <p>Total</p>
                  <p>${Math.round(oo?.cost / 380)}</p>
                </div>
              </div>
              <div className="checkout">
                <p className="cx-hdx">Apply Coupon Code</p>

                <Input name="coupon" placeHolder="" />
                <button className="btn centered" onClick={checkout}>
                  <p>Checkout</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
