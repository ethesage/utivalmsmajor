import { useState, useEffect } from 'react';

export default function Carousel(elements, ref, inView = undefined) {
  const [value, setValue] = useState(1);
  const [slides] = useState(elements);

  useEffect(() => {
    let interval;
    if (interval) return;
    if (!inView) return;
    interval = setInterval(function () {
      setValue(ref.current.slider.getInfo().displayIndex);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [inView, ref]);

  const move = (position) => {
    ref.current.slider.goTo(position);
    setValue(ref.current.slider.getInfo().displayIndex);
  };

  return [value, slides, move];
}
