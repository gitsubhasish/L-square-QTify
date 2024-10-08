import React from "react";
import { useSwiper } from "swiper/react";

const RightSwipeButton = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-button-next" onClick={() => swiper.slideNext()}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 16C0 24.875 7.125 32 16 32C24.8125 32 32 24.875 32 16C32 7.18747 24.8125 -3.05176e-05 16 -3.05176e-05C7.125 -3.05176e-05 0 7.18747 0 16ZM15.0625 23.5625C14.4375 24.1875 13.5 24.1875 12.9375 23.5625C12.3125 23 12.3125 22.0625 12.9375 21.5L18.375 16.0625L12.9375 10.625C12.3125 9.99997 12.3125 9.06247 12.9375 8.49997C13.5 7.87497 14.4375 7.87497 15.0625 8.49997L21.5625 14.9375C22.125 15.5625 22.125 16.5 21.5625 17.0625L15.0625 23.5625Z"
          fill="#34C94B"
        />
      </svg>
    </div>
  );
};

export default RightSwipeButton;
