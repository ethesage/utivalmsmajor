import React from 'react';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import './style.scss';

const ProgressBar = ({ progress }) => {
  return (
    <div className="px_sec box-shade flex-col">
      <p>{progress} %</p>
      <Progress
        className="slim"
        percent={progress}
        status="error"
        theme={{
          success: {
            symbol: '‍',
            color: 'rgb(223, 105, 180)',
          },
          error: {
            symbol: progress,
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
