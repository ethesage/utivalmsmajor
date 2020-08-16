import React, { useRef, useEffect } from 'react';
import './style.scss';

const RevielDrop = ({
  header,
  children,
  open = false,
  showArrow = true,
  className = '',
}) => {
  const headRef = useRef();

  useEffect(() => {
    const classes = showArrow ? ' showArrow' : '';
    headRef.current.className = `rx_header ${classes}${className}`;
    return () => {};
  }, [showArrow, className]);

  function handleClick(e) {
    if (!e.target.className.includes('rx_hd')) return;
    const elements = document.querySelectorAll('.rx_hd');

    elements.forEach((element) => {
      if (e.target === element) return;
      element.classList.remove('active');
      element.nextElementSibling.classList.remove('show');
    });

    // if (!e.target.className.includes('rx_hd')) return;
    e.target.classList.toggle('active');
    e.target.nextElementSibling.classList.toggle('show');
  }

  return (
    <div className="rx_drop">
      <div className="rx_hd" onClick={handleClick}>
        {React.cloneElement(header, { ref: headRef })}
      </div>
      <div className={`rx_con ${open ? 'open' : ''}`}>{children}</div>
    </div>
  );
};

export default RevielDrop;
