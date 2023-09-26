import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function SwiperMovieCard({ item }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  return (
    <div
      className="swiper_movie_card"
      onClick={() => navigate(`/watch/${item?.slug}`)}
    >
      <div className="swiper_movie_card_img">
        <img src={item?._id?.image} />
        <div className="swiper_movie_card_time">
          <i className="fa-sharp fa-regular fa-circle-play"></i>
          <span>{item?._id?.time}</span>
        </div>
      </div>
      <div
        className={
          item?.slug === slug
            ? "swiper_movie_card_content active"
            : "swiper_movie_card_content"
        }
      >
        {item?._id?.name}
      </div>
    </div>
  );
}

export default SwiperMovieCard;
