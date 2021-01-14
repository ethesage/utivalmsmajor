import React, { useEffect, useRef } from 'react';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Input from 'components/Input';
import { check, checkoutCourse, addPurchaseCourse } from 'g_actions/courses';
import './style.scss';

const Details = ({ proceed, match, set }) => {
  const { checkoutData, purchaseCourse } = useSelector(
    (state) => state.courses
  );
  const { push } = useHistory();
  const dispatch = useDispatch();
  const btnRef = useRef();

  const checkout = async () => {
    btnRef.current.classList.add('loader');
    const value = await dispatch(check(match.params.courseCohortId));

    if (value.message === 'Not Enrolled') {
      set(match.params.courseCohortId);
      proceed(1);
    } else push(`/courses/overview/${match.params.courseCohortId}`);
    // /
  };

  useEffect(() => {
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

  return purchaseCourse ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{purchaseCourse?.name}</title>
        <meta property="og:title" content={purchaseCourse?.name} />
        <meta name="description" content={purchaseCourse?.description} />
        <meta property="og:description" content={purchaseCourse?.description} />
        <meta property="og:image" content={purchaseCourse?.thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
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
              <p className="clipped-text" style={{ '--number': 4 }}>
                {purchaseCourse?.description}
              </p>
              <div className="c_inf flex-row j-space">
                <small>{purchaseCourse?.duration} Weeks</small>
                <small>
                  {'> '}
                  {purchaseCourse?.level}
                </small>
                <small>{purchaseCourse?.value}</small>
              </div>
              <a
                href={purchaseCourse?.learnMore}
                className="ext btn theme centered"
                target="_"
              >
                <p>Learn More</p>
              </a>
              {/* <Button /> */}
            </div>
            <div className="summary flex-row j-start">
              <div className="contents">
                <div className="cost-analysis">
                  <div className="flex-row j-space">
                    <p>Price</p>
                    <p>
                      {purchaseCourse?.type === 'free'
                        ? 'Free'
                        : `₦ ${Math.round(purchaseCourse?.cost)}`}
                    </p>
                  </div>
                  <div className="flex-row j-space">
                    <p>Discount</p>
                    <p>-</p>
                  </div>
                  <div className="flex-row j-space theme-color strong">
                    <p>Total</p>
                    <p>
                      {purchaseCourse?.type === 'free'
                        ? 'Free'
                        : `₦ ${Math.round(purchaseCourse?.cost)}`}
                    </p>
                  </div>
                </div>
                <div className="checkout">
                  <p className="cx-hdx">Apply Coupon Code</p>

                  <Input name="coupon" placeHolder="" />
                  <button
                    className="btn centered"
                    onClick={checkout}
                    ref={btnRef}
                  >
                    <p>Checkout</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex-row details" style={{ height: '300px' }}>
      <div
        className="spinner2"
        style={{ width: '100px', height: '100px' }}
      ></div>
    </div>
  );
};

export default Details;
