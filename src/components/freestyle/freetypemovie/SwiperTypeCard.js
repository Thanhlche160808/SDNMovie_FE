import React, { useCallback, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
function SwiperTypeCard({ item }) {
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
  }, []);
  const loadImage = useCallback((image) => {
    image.src = image.dataset.src;
  }, []);
  return (
    <Link to={`/movie/${item?.slug}`}>
      <div className="type_card">
        <div className="type_card_container">
          <img data-src={item?.image} src={""} />
          <h3 className="type_card_container_name">{item?.name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default SwiperTypeCard;
