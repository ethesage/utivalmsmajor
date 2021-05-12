import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import dialogPolyfill from 'dialog-polyfill';
import Close from '../../assets/icons/close';
import './style.scss';

const Modal = forwardRef(
  ({ children, useButton = true, runOnClose = () => {} }, ref) => {
    const disRef = useRef();

    useEffect(() => {
      return () => {
        document.querySelector('body').classList.remove('no-scroll');
      };
    }, []);

    useImperativeHandle(ref, () => ({
      open: () => {
        typeof disRef?.current?.showModal !== 'function' &&
          dialogPolyfill.registerDialog(disRef.current);

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
      runOnClose();
    };

    return (
      <dialog
        ref={disRef}
        className="apx_mod flex-center w-screen h-screen fixed border-0 bg-transparent top-0 bottom-0 left-0 right-0"
      >
        <div className="apx_in relative">
          {useButton && (
            <button
              className="apx_close -top-12 md:-left-12 right-0 md:right-auto absolute"
              onClick={(e) => {
                e.preventDefault();
                close();
              }}
            >
              <Close fill="black" width="30px" height="30px" />
            </button>
          )}
          {children}
        </div>
      </dialog>
    );
  }
);

export default Modal;
