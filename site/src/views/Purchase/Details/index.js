import React, { useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import getCurrencyRate from 'Hooks/getConvertionRate';
import Input from 'components/Input';
import { check, checkoutCourse, addPurchaseCourse } from 'g_actions/courses';
import './style.scss';

const Details = ({ proceed, match, set, setPaymentAmount }) => {
  const { checkoutData, purchaseCourse } = useSelector(
    (state) => state.courses
  );
  const { push } = useHistory();
  const dispatch = useDispatch();
  const btnRef = useRef();

  const [loading, rate] = getCurrencyRate();
  const [paymentType, setPaymentType] = useState();
  const [amountToPay, setAmountToPay] = useState();

  const checkout = async () => {
    btnRef.current.classList.add('loader');
    const value = await dispatch(check(match.params.courseCohortId));

    if (value.message === 'Not Enrolled') {
      set(match.params.courseCohortId);
      setPaymentAmount(amountToPay);
      proceed(1);
    } else push(`/courses/overview/${match.params.courseCohortId}`);
    // /
  };

  useEffect(() => {
    if (!paymentType) return;

    if (paymentType === 'split') {
      setAmountToPay(purchaseCourse.initialSplitAmount);
      document.querySelector('.summary').scrollIntoView();
      return;
    }

    setAmountToPay(purchaseCourse.cost);
    document.querySelector('.summary').scrollIntoView();

    return () => {};
  }, [paymentType, purchaseCourse]);

  useEffect(() => {
    if (!purchaseCourse) return;

    if (purchaseCourse?.CourseCohorts[0].paymentType === 'full')
      setAmountToPay(purchaseCourse.cost);
  }, [purchaseCourse]);

  useEffect(() => {
    document.querySelector('body').classList.add('smooth-scroll');

    (async () => {
      if (!checkoutData) {
        await dispatch(checkoutCourse(purchaseCourse));
      }
    })();

    return () => {
      document.querySelector('body').classList.remove('smooth-scroll');
    };
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

  const chooseCurrency = (amount) => {
    return purchaseCourse.currency_type === 'local'
      ? `₦ ${Math.round(amount)}`
      : `$ ${Math.round(amount / rate.USD_NGN)}`;
  };

  return purchaseCourse && !loading ? (
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
              <div>
                <h2>{purchaseCourse?.name}</h2>
                <p className="clipped-text" style={{ '--number': 4 }}>
                  {purchaseCourse?.description}
                </p>
              </div>
              <div>
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
              </div>
              {/* <Button /> */}
            </div>

            {purchaseCourse?.CourseCohorts[0].paymentType === 'split' && (
              <div className="summary split_sec">
                <h3 className="theme-color">How do you want to Pay</h3>
                <div
                  className="sel-p-type"
                  data-active={paymentType === 'full'}
                  onClick={() => setPaymentType('full')}
                >
                  <small>Full Payment</small>
                  <p>
                    You will pay{' '}
                    <strong className="theme-color">
                      {chooseCurrency(purchaseCourse?.cost)}
                    </strong>{' '}
                    now
                  </p>
                </div>
                <div
                  className="sel-p-type"
                  data-active={paymentType === 'split'}
                  onClick={() => setPaymentType('split')}
                >
                  <small>Part Payment</small>
                  <p>
                    You will pay{' '}
                    <strong className="theme-color">
                      {chooseCurrency(purchaseCourse?.initialSplitAmount)}
                    </strong>{' '}
                    now and{' '}
                    <strong className="theme-color">
                      {chooseCurrency(purchaseCourse?.finalSplitAmount)}
                    </strong>{' '}
                    later
                  </p>
                </div>
              </div>
            )}

            {amountToPay && (
              <div className="summary flex-row j-start">
                <div className="contents">
                  <div className="cost-analysis">
                    <div className="flex-row j-space">
                      <p>Price</p>
                      <p>
                        {purchaseCourse?.type === 'free'
                          ? 'Free'
                          : chooseCurrency(amountToPay)}
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
                          : chooseCurrency(amountToPay)}
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
            )}
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
