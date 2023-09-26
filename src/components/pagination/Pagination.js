import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
function Pagination({ page, totalPage }) {
  const navigate = useNavigate();
  return (
    <div className="paging container">
      <span
        onClick={() => navigate(`?page=${parseInt(page) - 1}`)}
        className={page == 1 ? "d-none" : ""}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </span>
      <span
        style={{
          color: "#2f80ed",
        }}
      >
        {page}
      </span>
      <span
        onClick={() => navigate(`?page=${parseInt(page) + 1}`)}
        className={page == totalPage ? "d-none" : ""}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </span>
    </div>
  );
}

export default Pagination;
