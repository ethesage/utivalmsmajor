import React, { useState, useRef, useEffect } from 'react';
import check from 'assets/checkmark.png';
import './style.scss';

const Confirm = ({ text, close, onClick, closeText }) => {
  const [confirmed, setConfirmed] = useState(false);
  const btnRef = useRef();

  const handleClick = async () => {
    btnRef.current.classList.add('loader');
    const confirm = await onClick();
    setConfirmed(confirm);

    !confirm && btnRef.current.classList.remove('loader');
  };

  useEffect(() => {
    if (!confirmed) {
      btnRef.current.classList.remove('loader');
      return;
    }

    const time = setTimeout(function () {
      close();
      setConfirmed(false);
    }, 1000);

    return () => {
      clearTimeout(time);
    };
  }, [close, confirmed]);

  return (
    <div className="confirm_dx">
      {confirmed ? (
        <div className="uxp_done flex-col">
          <img src={check} alt="successful" />
          <p>{closeText}</p>
        </div>
      ) : (
        <>
          <p className="mn_txt">{text}</p>
          <div className="flex-row">
            <button className="clx_btn" ref={btnRef} onClick={handleClick}>
              <p>Yes</p>
            </button>
            <p className="clx_btn" onClick={close}>
              No
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Confirm;
