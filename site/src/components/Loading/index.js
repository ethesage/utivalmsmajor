import React from 'react';
import './style.scss';

const Loader = ({ tempLoad, full }) => {
  const styles = full
    ? {
        width: '100%',
        height: '100vh',
        position: 'fixed',
        background: 'white',
        top: 0,
        left: 0,
        zIndex: 200,
        justifyContent: 'center',
      }
    : {
        width: '100%',
        height: '100%',
        minHeight: '500px',
        background: 'white',
        position: 'relative',
        zIndex: 200,
        justifyContent: 'center',
      };

  return (
    <>
      {tempLoad ? (
        <main className="loader_con_main flex-col" style={styles}>
          <div>
            <div className="loader_main">
              <svg viewBox="0 0 80 80">
                <circle id="test" cx="40" cy="40" r="32"></circle>
              </svg>
            </div>

            <div className="loader_main triangle">
              <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72"></polygon>
              </svg>
            </div>

            <div className="loader_main">
              <svg viewBox="0 0 80 80">
                <rect x="8" y="8" width="64" height="64"></rect>
              </svg>
            </div>
          </div>
          <p>Loading...</p>
        </main>
      ) : null}
    </>
  );
};

export default Loader;
