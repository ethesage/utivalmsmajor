import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Input from "components/Input";
// import category from "data/categories";
import { check, checkoutCourse, addPurchaseCourse } from "g_actions/courses";
import "./style.scss";

// const course = category[0].data[0];

const Details = ({ proceed, match, set }) => {
  const { mappedCourses } = useSelector((state) => state.courses);
  const { checkoutData, purchaseCourse } = useSelector(
    (state) => state.courses
  );
  const { push } = useHistory();
  const [val, setVal] = useState(null);
  // console.log(!mappedCourses && match.params.courseCohortId === "null");

  // if (!mappedCourses && match.params.courseCohortId === 'null') push('/');
  // console.log(mappedCourses);
  const oo = mappedCourses?.find(
    (course) => course.courseCohortId === match.params.courseCohortId
  );

  // console.log(oo);

  // if (!oo) push('/');

  // console.log(oo, "ooooo",checkoutData,'ooop');

  const dispatch = useDispatch();

  const checkout = async () => {
    const value = await dispatch(check(match.params.courseCohortId));
    if (value.message === "Not Enrolled") {
      set(match.params.courseCohortId);
      proceed(1);
    } else push(`/courses/overview/${match.params.courseCohortId}`);
    // /
  };

  useEffect(() => {
    // if (!oo) push('/');
    if (!val) setVal(oo);
    (async () => {
      if (!checkoutData) {
        await dispatch(checkoutCourse(purchaseCourse));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      if (!purchaseCourse) {
        await dispatch(addPurchaseCourse(match.params.courseCohortId));
      } else await dispatch(checkoutCourse(purchaseCourse));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseCourse]);
  // console.log

  return (
    purchaseCourse && (
      <div className="details">
        <div className="container">
          <div className="details_con mx-auto">
            <div className="img-sec flex-row j-end">
              <img
                src={purchaseCourse?.thumbnail}
                alt={purchaseCourse?.name}
                className="img cover"
              />
            </div>
            <div className="text-sec flex-col j-space al-start">
              <h2>{purchaseCourse?.name}</h2>
              <p className="clipped-text" style={{ "--number": 4 }}>
                {purchaseCourse?.description}
              </p>
              <div className="c_inf flex-row j-space">
                <small>{purchaseCourse?.duration} Weeks</small>
                <small>
                  {"> "}
                  {purchaseCourse?.level}
                </small>
                <small>{purchaseCourse?.value}</small>
              </div>
              <Link
                to={purchaseCourse?.extLink}
                className="ext btn theme centered"
              >
                <p>Learn More</p>
              </Link>
              {/* <Button /> */}
            </div>
            <div className="summary flex-row j-start">
              <div className="contents">
                <div className="cost-analysis">
                  <div className="flex-row j-space">
                    <p>Price</p>
                    <p>${Math.round(purchaseCourse?.cost / 380)}</p>
                  </div>
                  <div className="flex-row j-space">
                    <p>Discount</p>
                    <p>-</p>
                  </div>
                  <div className="flex-row j-space theme-color strong">
                    <p>Total</p>
                    <p>${Math.round(purchaseCourse?.cost / 380)}</p>
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
    )
  );
};

export default Details;
