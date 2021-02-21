import React from 'react';

const Spinner = () => {
  return (
    <span
      className="animate-spin-fast inline-block h-10 w-10 mr-3 rounded-full border-4 border-theme"
      style={{ borderTopColor: 'transparent' }}
    ></span>
  );
};

export default Spinner;
