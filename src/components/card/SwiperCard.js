import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
function SwiperCard({ item }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, []);
  return (
    <div
      className="swiper_card"
      onClick={() => navigate(`/movie/${item?.slug}`)}
    >
      <div className="swiper_card_img">
        <img src={item?.image} alt={`${item?.name}`} />
      </div>
      <div className="rate">
        <i className="fa-regular fa-star"></i>
        {item?.totalRate}
      </div>
      <div className="swiper_card_content">
        <div className="swiper_card_content_title">{item?.name}</div>
        <div className="swiper_card_content_type">
          <span>{item?.typeMovie[0]?._id?.typeName}</span>
          <span className="time">{item?.datePub}</span>
        </div>
      </div>
    </div>
  );
}

export default SwiperCard;
