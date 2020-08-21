import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import Close from '../../assets/icons/close';
import './style.scss';

const Modal = forwardRef(({ children }, ref) => {
  const disRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      disRef.current.showModal();
      document.querySelector('body').classList.add('no-scroll');
    },
  }));

  const close = () => {
    disRef.current.close();
    document.querySelector('body').classList.remove('no-scroll');
  };

  return (
    <dialog ref={disRef} className="apx_mod">
      <div className='apx_in'>
        <button className="apx_close" onClick={close}>
          <Close fill="black" width="30px" height="30px" />
        </button>
        {children}
      </div>
    </dialog>
  );
});

export default Modal;
