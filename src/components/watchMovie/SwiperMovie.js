import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/scss";
import SwiperMovieCard from "./SwiperMovieCard";
import "swiper/scss/navigation";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
export default ({ chap }) => {
  const { slug } = useParams();
  const [swiper, setSwiper] = useState(null);
  const currentIndex = useMemo(() => {
    return chap?.video?.findIndex((item) => item?.slug === slug);
  }, [slug, chap]);
  useEffect(() => {
    if (currentIndex) {
      swiper.slideTo(currentIndex);
    }
  }, [currentIndex]);
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={5}
      pagination={{ clickable: true }}
      className="swiper_movie"
      onSwiper={(e) => {
        return setSwiper(e);
      }}
      breakpoints={{
        300: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 5,
        },
      }}
    >
      {chap?.video?.map((item, index) => {
        return (
          <SwiperSlide key={index + "videoChap"}>
            <SwiperMovieCard item={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
