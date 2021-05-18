import React, { useState, useEffect } from 'react';
import './style.scss';

const Viewer = ({ docs, close }) => {
  const [loading, setLoading] = useState(docs);

  useEffect(() => {
    if (docs) {
      setLoading(true);
    }
  }, [docs]);

  const handleLoad = (e) => {
    setLoading(false);
  };

  const handleError = (e) => {
    setLoading(false);
    close(e);
  };

  return docs ? (
    <div className="doc-view">
      {loading && <p>Loading...</p>}

      <iframe
        onLoad={handleLoad}
        onError={handleError}
        title="docs"
        src={`https://docs.google.com/gview?url=${encodeURIComponent(
          docs
        )}&embedded=true`}
        style={{ width: '100%', height: '100%' }}
        frameBorder="0"
      ></iframe>
    </div>
  ) : null;
};

//docs.google.com/viewer?url=https%3A%2F%2Fwww.pridemagazineng.com%2FprideMagNG_consumer_brands_2020.pdf&embedded=true&hl=en
// try this url later

export default Viewer;
