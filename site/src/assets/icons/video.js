import React from 'react';

const video = ({ className }) => {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0)">
        <path d="M11.3959 3.42383H2.1095C1.49157 3.4246 0.990963 3.95262 0.990234 4.60438V12.3733C0.990963 13.0251 1.49157 13.5531 2.1095 13.5539H11.3959C12.0137 13.5531 12.5145 13.0251 12.5152 12.3733V4.60438C12.5145 3.95262 12.0137 3.4246 11.3959 3.42383Z" />
        <path d="M13.2617 10.1056L17.108 12.3205V4.68213L13.2617 6.89705V10.1056Z" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="16.1175"
            height="17"
            fill="white"
            transform="translate(0.990234)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default video;
