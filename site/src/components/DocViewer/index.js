import { useState, useEffect } from 'react';
import Close from 'assets/icons/close';

const Viewer = ({ docs, close }) => {
  const [loading, setLoading] = useState(docs);

  useEffect(() => {
    document.querySelector('body').classList.add('no-scroll');

    if (docs) {
      setLoading(true);
    }
  }, [docs]);

  const handleLoad = (e) => {
    setLoading(false);
  };

  const handleError = (e) => {
    setLoading(false);
    document.querySelector('body').classList.remove('no-scroll');
    close(e);
  };

  const closeViewer = (e) => {
    close(e);
    document.querySelector('body').classList.remove('no-scroll');
  };

  return docs ? (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 bg-white">
      {loading && (
        <div className="h-full w-full flex-center">
          <p className="animate-pulse text-theme">Loading...</p>
        </div>
      )}

      <button className="fixed p-2 top-2 left-2 bg-white" onClick={closeViewer}>
        <Close className="w-5 h-5" />
      </button>

      <iframe
        onLoad={handleLoad}
        onError={handleError}
        title="docs"
        sandbox="allow-scripts allow-same-origin"
        // src={`https://docs.google.com/viewer?url=${encodeURIComponent(
        //   docs
        // )}&embedded=true&hl=en`}

        src="https://docs.google.com/viewer?srcid=1IWA0-Uq4SMIzo_Z86sjDLSA5SAUrvtBm&pid=explorer&efh=false&a=v&chrome=false&embedded=true"
        style={{ width: '100%', height: '100%' }}
        frameBorder="0"
      ></iframe>
    </div>
  ) : null;
};

//docs.google.com/viewer?url=https%3A%2F%2Fwww.pridemagazineng.com%2FprideMagNG_consumer_brands_2020.pdf&embedded=true&hl=en
// try this url later

export default Viewer;

//
