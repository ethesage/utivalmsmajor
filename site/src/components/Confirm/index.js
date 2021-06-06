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

    !confirm && btnRef.current?.classList?.remove('loader');
  };

  useEffect(() => {
    if (!confirmed) {
      btnRef.current.classList.remove('loader');
      return;
    }

    const time = setTimeout(function () {
      close();
      setConfirmed(false);
    }, 200);

    return () => {
      clearTimeout(time);
    };
  }, [close, confirmed]);

  return (
    <div
      className="bg-white rounded-md p-7"
      style={{
        width: '90vw',
        maxWidth: '400px',
        minWidth: '250px',
      }}
    >
      {confirmed ? (
        <div className="uxp_done flex-col">
          <img src={check} alt="successful" />
          <p>{closeText}</p>
        </div>
      ) : (
        <>
          <p className="text-center mb-10">{text}</p>
          <div className="-mx-3.5">
            <div className="w-1/2 px-3.5 inline-block">
              <button
                className="w-full text-center bg-theme text-white p-2 rounded-sm"
                ref={btnRef}
                onClick={handleClick}
              >
                <p>Yes</p>
              </button>
            </div>
            <div className="w-1/2 px-3.5 inline-block rounded-sm transition-all duration-300 hover:bg-light_shade hover:text-white">
              <p className="w-full text-center p-2" onClick={close}>
                No
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Confirm;
