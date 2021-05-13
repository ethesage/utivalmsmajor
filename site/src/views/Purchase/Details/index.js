import React, { useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { useHistory, useLocation } from 'react-router-dom';
import getCurrencyRate from 'Hooks/getConvertionRate';
import Input from 'components/Input';
import { check, checkoutCourse, addPurchaseCourse } from 'g_actions/courses';
import Experience from 'assets/icons/experience';
import Clock from 'assets/icons/clock';
import Button from 'components/Button';
import { format_comma, axiosInstance, validate } from 'helpers';
import loading_icon from 'assets/loader.gif';
import checkMark from 'assets/check_mark.png';
import Spinner from 'components/Spinner';
import './style.scss';
import TrainerCardList from 'components/TrainerCardList';

const Details = ({ proceed, match, set, setPaymentAmount, setUsedCoupon }) => {
  const { checkoutData, purchaseCourse } = useSelector(
    (state) => state.courses
  );
  const { push } = useHistory();
  const dispatch = useDispatch();
  const btnRef = useRef();
  const { addToast } = useToasts();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const iscourseUrl = params.get('course');

  const [loading, rate] = getCurrencyRate();
  const [paymentType, setPaymentType] = useState();
  const [amountToPay, setAmountToPay] = useState();
  const [enterCoupon, setEnterCoupon] = useState(false);
  const [couponDetails, setCouponDetails] = useState({
    code: '',
    value: 0,
  });
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [validateSelf, setValidateSef] = useState(false);

  const checkout = async () => {
    btnRef.current.classList.add('loader');
    const value = await dispatch(check(purchaseCourse.CourseCohorts[0].id));

    if (value?.message === 'Not Enrolled') {
      set(purchaseCourse.CourseCohorts[0].id);
      setPaymentAmount(amountToPay - couponDetails.value);
      if (couponDetails.value > 0) setUsedCoupon(couponDetails);
      proceed(1);
    } else push(`/courses/overview/${purchaseCourse.CourseCohorts[0].id}`);
  };

  useEffect(() => {
    if (purchaseCourse?.type === 'free') {
      setAmountToPay(purchaseCourse?.cost);
      setPaymentType('full');
      return;
    }

    if (!paymentType) return;

    if (paymentType === 'split') {
      setAmountToPay(purchaseCourse.initialSplitAmount);
      document.querySelector('.summary').scrollIntoView();
      return;
    }

    setAmountToPay(purchaseCourse.cost);
    document.querySelector('.summary').scrollIntoView();

    return () => {};
  }, [paymentType, purchaseCourse, couponDetails]);

  useEffect(() => {
    if (!purchaseCourse) return;

    if (purchaseCourse?.CourseCohorts[0].paymentType === 'full')
      setAmountToPay(purchaseCourse.cost);
  }, [purchaseCourse, couponDetails]);

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
        await dispatch(
          addPurchaseCourse(match.params.courseCohortId, iscourseUrl)
        );
      } else await dispatch(checkoutCourse(purchaseCourse));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purchaseCourse]);

  const chooseCurrency = (amount) => {
    return purchaseCourse.currency_type === 'local'
      ? `₦ ${format_comma(Math.round(amount))}`
      : `$ ${format_comma(Math.round(amount / rate.USD_NGN))}`;
  };

  const toggleCoupon = () => {
    setEnterCoupon(!enterCoupon);
  };

  const fetchCouponDetails = async (e) => {
    e.preventDefault();

    if (!validate(couponDetails.code, 'coupon')) {
      return setValidateSef(true);
    }

    setLoadingCoupon(true);

    try {
      const data = await axiosInstance.get(`/coupon/${couponDetails.code}`);

      setCouponDetails((prev) => ({
        ...prev,
        value: data.value > amountToPay ? amountToPay : data.value,
      }));
      setLoadingCoupon(false);
    } catch (err) {
      addToast(
        err.response && err.response.status === 409
          ? 'Coupon expired'
          : 'Coupon details not correct',
        {
          appearance: 'error',
          autoDismiss: true,
        }
      );
      setLoadingCoupon(false);
    }
  };

  const handleChange = ({ target }) => {
    setCouponDetails((prev) => ({ ...prev, code: target.value }));
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
      <div className="details pb-12">
        <div className="container --small mx-auto">
          <h2 className="text-theme text-lg font-semibold mb-3">
            Course Details
          </h2>
          <div className="details_con mx-auto block md:grid grid-flow-dense grid-cols-5 gap-4 grid-row-2 items-stretch">
            <div className="img-sec flex-col al-start col-span-3 md:w-4/5">
              <p className="mb-3">{purchaseCourse?.name}</p>

              <img
                src={purchaseCourse?.thumbnail}
                alt={purchaseCourse?.name}
                className="w-full object-cover mb-5 rounded-md overflow-hidden shadow h-80"
              />

              <div className="flex flex-col mb-5">
                <h3 className="font-semibold text-theme mb-2">About Course</h3>

                <div className="mb-3">
                  <p className="text-sm inline">
                    {purchaseCourse?.description}{' '}
                  </p>
                  <a
                    href={purchaseCourse?.learnMore}
                    target="_"
                    className="text-theme text-sm font-semibold"
                  >
                    Read More
                  </a>
                </div>

                <div>
                  <div className="c_inf flex-row j-space">
                    <small className="inline-flex items-center mr-5">
                      <Clock className="inline-block mr-3 w-5 h-5" />{' '}
                      {purchaseCourse?.duration} Weeks
                    </small>
                    <small className="inline-flex items-center">
                      <Experience className="inline-block mr-3 w-5 h-5" />
                      {purchaseCourse?.level}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 mb-5 ">
              <div className="border border-gray-200 max-w-sm rounded-md p-6 bg-white">
                <h1 className="mb-3">{purchaseCourse?.name}</h1>

                <h1 className="text-theme text-2xl font-semibold pb-4 border-b border-gray-300 mb-5">
                  {chooseCurrency(purchaseCourse?.cost)}
                </h1>

                {purchaseCourse?.CourseCohorts[0].paymentType === 'split' &&
                  purchaseCourse?.type !== 'free' && (
                    // {true && (
                    <div className="summary split_sec">
                      <h3 className="font-semibold text-xs mb-2.5">
                        How do you want to Pay?
                      </h3>
                      <div
                        className="sel-p-type relative"
                        data-active={paymentType === 'full'}
                        onClick={() => setPaymentType('full')}
                      >
                        <small>Full Payment</small>
                        <p className="text-sm">
                          You will pay{' '}
                          <strong>
                            {chooseCurrency(purchaseCourse?.cost)}
                          </strong>{' '}
                          now
                        </p>
                        <div className="absolute ch_mk top-2.5 right-2.5 border border-gray-400 w-5 h-5 flex-center rounded-full">
                          <img
                            src={checkMark}
                            alt="check mark"
                            className="hidden"
                          />
                        </div>
                      </div>
                      <div
                        className="sel-p-type relative"
                        data-active={paymentType === 'split'}
                        onClick={() => setPaymentType('split')}
                      >
                        <small>Part Payment</small>
                        <p className="text-sm">
                          You will pay{' '}
                          <strong>
                            {chooseCurrency(purchaseCourse?.initialSplitAmount)}
                          </strong>{' '}
                          now and{' '}
                          <strong>
                            {chooseCurrency(purchaseCourse?.finalSplitAmount)}
                          </strong>{' '}
                          later
                        </p>
                        <div className="absolute ch_mk top-2.5 right-2.5 border border-gray-400  w-5 h-5 flex-center rounded-full">
                          <img
                            src={checkMark}
                            alt="check mark"
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                {amountToPay && (
                  <div className="summary mt-3">
                    <strong className="text-sm mt-3 mb-10">
                      Payment summary:
                    </strong>
                    <div className="">
                      <div className="cost-analysis">
                        <div className="flex text-sm mb-1 itmes-center justify-between ">
                          <p>Price</p>
                          <p>
                            {purchaseCourse?.type === 'free'
                              ? 'Free'
                              : chooseCurrency(amountToPay)}
                          </p>
                        </div>
                        <div className="flex text-sm mb-1 itmes-center justify-between ">
                          <p>Discount</p>
                          <p>
                            {couponDetails
                              ? `- ${chooseCurrency(couponDetails.value)}`
                              : '-'}
                          </p>
                        </div>
                        <div className="flex text-sm mb-1 itmes-center justify-between  theme-color strong">
                          <p>Total</p>
                          <p className="font-semibold">
                            {purchaseCourse?.type === 'free'
                              ? 'Free'
                              : chooseCurrency(
                                  amountToPay - couponDetails.value
                                )}
                          </p>
                        </div>
                      </div>
                      <div className="checkout">
                        <p
                          className="mb-2 text-xs mt-2 text-theme underline cursor-pointer"
                          onClick={toggleCoupon}
                        >
                          Enter Coupon
                          {loadingCoupon && (
                            <img
                              src={loading_icon}
                              alt="loading..."
                              className="w-10 h-10 inline-block"
                            />
                          )}
                        </p>

                        {enterCoupon && (
                          <form>
                            <Input
                              name="coupon"
                              placeHolder=""
                              attr={{ autoFocus: true }}
                              value={couponDetails.code}
                              handleChange={handleChange}
                              validateSelf={validateSelf}
                              errorMsg="Enter valid coupon details"
                              required
                            />

                            <button
                              onClick={fetchCouponDetails}
                              className="text-xs bg-theme text-white rounded-md px-5 py-1.5 mt-2"
                            >
                              Apply
                            </button>
                          </form>
                        )}
                        <div className="flex justify-end mt-5">
                          <Button
                            text="Proceed To pay"
                            btnRef={btnRef}
                            onClick={checkout}
                            className="w-auto"
                            disabled={!amountToPay}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {purchaseCourse?.CohortTrainers?.lenght > 0 && (
              <div className="col-span-3 md:w-4/5">
                <div className="mb-6">
                  <h2 className="font-semibold text-theme mb-2">
                    You are in safe hands
                  </h2>

                  <p style={{ letterSpacing: '0.4em' }}>
                    MEET OUR TOP INSTRUCTORS
                  </p>
                </div>

                <TrainerCardList data={purchaseCourse?.CohortTrainers} />
                <small>
                  Have more questions?{' '}
                  <a
                    className="text-theme font-semibold"
                    href="https://utiva.io/contact-us"
                  >
                    Contact us
                  </a>
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex-center" style={{ height: '300px' }}>
      <Spinner />
    </div>
  );
};

export default Details;
