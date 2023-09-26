import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
function MovieCard({ item }) {
  const navigate = useNavigate();
  useEffect(() => {
    let observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
        }
      });
    });
    const img = document.querySelectorAll("[data-src]");
    img.forEach((item) => {
      observer.observe(item);
    });
    return () => {
      img.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [item]);
  const loadImage = useCallback((image) => {
    image.src = image.dataset.src;
  }, []);
  return (
    <div className="movie_card_flex">
      <Link style={{ textDecoration: "none" }} to={`/movie/${item?.slug}`}>
        <div className="movie_card">
          <div className="movie_card_header">
            <img data-src={item?.image} src={""} alt={`${item?.name}`} />
            <div className="movie_card_play">
              <div className="movie_card_play_icon">
                <i className="fa-solid fa-play"></i>
              </div>
            </div>
            <div className="movie_rate">
              <i className="fa-solid fa-star"></i>
              {item?.totalRate}
            </div>
          </div>
          <div className="movie_card_content">
            <div className="movie_card_content_title">{item?.name}</div>
            <div className="movie_card_content_type">
              <span
                style={{
                  marginRight: "20px",
                }}
              >
                {item?.typeMovie?.[0]?._id?.typeName}
              </span>
              <span>{item?.datePub}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
