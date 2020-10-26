import { useState, useEffect } from 'react';

const useFetch = (dispatch, initailLoadingState, reload) => {
  const [loading, setLoading] = useState(initailLoadingState);
  const [started, setStarted] = useState(false);
  const [timeOut, setTimeOut] = useState(1000);
  const [error, setError] = useState();
  const [cb, fetch] = useState();
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timeOutID;

    (async () => {
      if (started) return;
      if (!cb) return;

      try {
        setStarted(true);
        setLoading(true);
        await dispatch(cb);

        setLoading(false);
        setError(null);
        // }
      } catch (err) {
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
  }, [cb, started, timeOut, reload, dispatch, running]);

  return [loading, error, fetch];
};

export default useFetch;
