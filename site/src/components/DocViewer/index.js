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

export default Viewer;
