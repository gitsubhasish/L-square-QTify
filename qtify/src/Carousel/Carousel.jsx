import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// Swiper modules
import { Navigation, Pagination } from "swiper/modules";

import LeftButton from "./LeftButton";
import RightButton from "./RightSwipeButton";

const Carousel = ({ children }) => {
  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={1}
      slidesPerView={8} // Default to 1 slide per view
      breakpoints={{
        // When window width is >= 640px
        640: {
          slidesPerView: 4,
        },
        // When window width is >= 768px
        768: {
          slidesPerView: 6,
        },
        // When window width is >= 1024px
        1024: {
          slidesPerView: 8,
        },
      }}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
      <LeftButton />
      <RightButton />
    </Swiper>
  );
};

export default Carousel;
