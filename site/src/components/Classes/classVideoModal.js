import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/components/effect-fade/effect-fade.scss';

SwiperCore.use([Navigation]);

function ClassVideoModal({ data }) {
  const { length } = data;

  if (!length || length === 0) {
    return (
      <div
        className="flex-row modal-pnt"
        style={{ background: 'white', padding: '50px' }}
      >
        <p>No videos uploded yet</p>
      </div>
    );
  }

  return (
    <div className="modal-pnt">
      <Swiper
        navigation
        loop
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        {data.map((vid, i) => (
          <SwiperSlide className="modal-chl">
            <iframe
              title={`${data.id}_previous_video_${i}`}
              src={`https://player.vimeo.com/video/${vid.link}`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ClassVideoModal;
