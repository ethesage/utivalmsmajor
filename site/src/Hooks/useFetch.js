import { useState, useEffect, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { log_out } from 'g_actions/user';

const useFetch = (dispatch, initailLoadingState, reload) => {
  const [loading, setLoading] = useState(initailLoadingState);
  const [started, setStarted] = useState(false);
  const [timeOut, setTimeOut] = useState(1000);
  const [error, setError] = useState();
  const [cb, fetch] = useState();
  const [running, setRunning] = useState(false);
  const { addToast } = useToasts();
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let timeOutID;

    (async () => {
      if (started) return;
      if (!cb) return;

      try {
        setStarted(true);
        setLoading(true);
        await dispatch(cb);

        if (!mounted.current) return;

        setLoading(false);
        setError(null);
        // }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          addToast('Session expired, please login again', {
            appearance: 'error',
            autoDismiss: true,
          });
          dispatch(log_out());
          return;
        }

        if ((!err.response || err.response.status === 500) && reload) {
          if (running) return;
          setRunning(true);

          timeOutID = setTimeout(function () {
            setRunning(false);
            setStarted(false);
            let time;

            if (timeOut > 5000) {
              time = timeOut;
            } else {
              time = timeOut === 1000 ? 2000 : timeOut * 2;
            }

            setTimeOut(time);
          }, timeOut);
          return;
        }

        setStarted(true);
        setError(true);
        setLoading(false);
      }
    })();

    return () => {
      clearTimeout(timeOutID);
    };
  }, [cb, started, timeOut, reload, dispatch, running, addToast]);

  const restart = () => {
    setLoading(true);
    setStarted(false);
  };

  return [loading, error, fetch, restart];
};

export default useFetch;
