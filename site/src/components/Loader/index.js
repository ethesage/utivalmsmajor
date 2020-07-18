import React from 'react';
import { useSelector } from 'react-redux';
// import loadvid from '../../assets/logo-theme.png';

const Loader = ({ tempLoad }) => {
  const loading = useSelector((state) => state.load.loading);

  return (
    <>
      {loading || tempLoad ? (
        <main
          className='full-center'
          style={{
            width: '100%',
            height: '100vh',
            position: 'fixed',
            background: 'white',
            top: 0,
            left: 0,
            zIndex: 200,
            justifyContent: 'center',
          }}
        >
          <video className='img contain' autoPlay loop>
            {/* <source src={loadvid} type='video/mp4' /> */}
          </video>
        </main>
      ) : null}
    </>
  );
};

export default Loader;
