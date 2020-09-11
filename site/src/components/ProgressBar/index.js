import React from 'react';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import './style.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className="px_sec box-shade flex-col">
      <p>File Uploading...</p>
      <Progress
        className="slim"
        percent={progress}
        status="success"
        theme={{
          success: {
            symbol: '‍',
            color: '#09AC23',
          },
          error: {
            symbol: '',
            color: 'rgb(223, 105, 180)',
          },
          default: {
            symbol: '😱',
            color: '#fbc630',
          },
        }}
      />
    </div>
  );
};

export default ProgressBar;
