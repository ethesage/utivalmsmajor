import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-skeleton-loader';

const Image = ({
  image,
  imgClass,
  usePlaceHolder = true,
  transitionSpeed = '500',
  lazyLoad = false,
  alt,
  srcset
}) => {
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: '200px 50px 50px 50px'
  });

  useEffect(() => {
    if (lazyLoad) {
      if (inView) {
        setSrc(image);
      }
    } else {
      setSrc(image);
    }
  }, [image, inView, lazyLoad, srcset]);

  const [src, setSrc] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(0);

  const handleLoad = () => {
    setLoading(1);
  };

  const handleError = () => {
    setLoading(1);
    setError(true);
  };

  return (
    <>
      {loading === 0 && usePlaceHolder ? (
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          <Skeleton width='100%' height='100%' />
        </div>
      ) : (
        ''
      )}
      <img
        ref={ref}
        className={imgClass}
        alt={alt}
        src={
          error
            ? 'https://res.cloudinary.com/drdje1skj/image/upload/v1567527717/placeholder-image4_s2xbim.jpg'
            : src
        }
        onLoad={handleLoad}
        style={{
          opacity: loading,
          transition: `all ${transitionSpeed}ms ease-in-out`
        }}
        onError={handleError}
      />
    </>
  );
};

export default React.memo(Image);
