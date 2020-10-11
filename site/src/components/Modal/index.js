import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import Close from '../../assets/icons/close';
import './style.scss';

const Modal = forwardRef(({ children }, ref) => {
  const disRef = useRef();

  useEffect(() => {
    return () => {
      document.querySelector('body').classList.remove('no-scroll');
    };
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => {
      if (disRef.current.open) return;
      disRef.current.showModal();
      document.querySelector('body').classList.add('no-scroll');
    },

    close: () => {
      document.querySelector('body').classList.remove('no-scroll');
      close();
    },
  }));

  const close = () => {
    document.querySelector('body').classList.remove('no-scroll');
    disRef.current.close();
  };

  return (
    <dialog ref={disRef} className="apx_mod">
      <div className="apx_in">
        <button className="apx_close" onClick={close}>
          <Close fill="black" width="30px" height="30px" />
        </button>
        {children}
      </div>
    </dialog>
  );
});

export default Modal;
