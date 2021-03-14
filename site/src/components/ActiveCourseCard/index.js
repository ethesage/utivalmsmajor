import React from 'react';
import { Progress } from 'react-sweet-progress';
import Image from '../Image';
import 'react-sweet-progress/lib/style.css';
import './style.scss';

const CousreCard = ({ course, cohort, isStudent, range, progress }) => {
  const { thumbnail, name } = course;

  return (
    <div className="ac_cx_cd flex-row j-start al-start">
      <div className="img-sec">
        <Image imgClass="img cover" lazyLoad={true} image={thumbnail} />
      </div>
      <div className="txt-sec flex-col j-space">
        <div className="title_sec flex-col j-space al-start">
          <h3 className="theme-color">{name}</h3>
          {!isStudent && (
            <div className="cx_h">
              <h4>{cohort.cohort}</h4>
              <small>{range}</small>
            </div>
          )}
        </div>

        <div className="px">
          <small>Completion level</small>
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
                symbol: '40%',
                color: 'red',
              },
              default: {
                symbol: '😱',
                color: '#fbc630',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CousreCard;
