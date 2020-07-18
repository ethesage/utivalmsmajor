import React from 'react';
import './style.scss';

function Dots({ className = '', func, value, number, border = true }) {
  return (
    <div className={`${className} dots_container flex-row`}>
      {Array.from(Array(number).keys()).map((index) => (
        <button
          className='dot_button flex-row'
          key={index}
          onClick={() => func(index)}
        >
          <span
            className='dot'
            style={{ border: border ? '' : 'none' }}
            data-active={index === value ? 'active' : null}
          ></span>
        </button>
      ))}
    </div>
  );
}

export default Dots;
