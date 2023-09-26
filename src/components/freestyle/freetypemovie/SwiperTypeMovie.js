// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import SwiperTypeCard from "./SwiperTypeCard";
import { useRef } from "react";

export default ({ movies, detail }) => {
  const swiperRef = useRef(null);
  return (
    <div>
      <div className="free_type_header">
        <h2>Phim {detail?.typeName}</h2>
        <div>
          <span onClick={() => swiperRef?.current?.slidePrev()}>
            <i className="fa-solid fa-angle-left"></i>
          </span>
          <span onClick={() => swiperRef?.current?.slideNext()}>
            <i className="fa-solid fa-angle-right"></i>
          </span>
        </div>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={5.25}
        className="swiper_type"
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          300: {
            slidesPerView: 1.25,
          },
          500: {
            slidesPerView: 2.25,
          },
          700: {
            slidesPerView: 3.25,
          },
          1000: {
            slidesPerView: 5.25,
          },
        }}
      >
        {movies?.map((item, index) => {
          return (
            <SwiperSlide key={index + "typeMovie"}>
              <SwiperTypeCard item={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
