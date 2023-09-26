import React from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
function Paging({ totalPage }) {
  const { search } = useLocation();
  let page = new URLSearchParams(search).get("page") || 1;
  const navigate = useNavigate();
  const handleNext = () => {
    const type = new URLSearchParams(search).get("type") || "all";
    const view = new URLSearchParams(search).get("view") || "desc";
    const sort = {
      type: type,
      view: view,
      page: parseInt(page) + 1,
    };
    const sortURL = new URLSearchParams(sort).toString();
    console.log(sortURL);
    navigate(`?${sortURL}`);
  };
  const handlePrev = () => {
    const type = new URLSearchParams(search).get("type") || "all";
    const view = new URLSearchParams(search).get("view") || "desc";
    const sort = {
      type: type,
      view: view,
      page: parseInt(page) - 1,
    };
    const sortURL = new URLSearchParams(sort).toString();
    console.log(sortURL);
    navigate(`?${sortURL}`);
  };
  return (
    <div className="paging container">
      <span
        onClick={handlePrev}
        className={page == 1 || totalPage === 0 ? "d-none" : ""}
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
        onClick={handleNext}
        className={page == totalPage || totalPage === 0 ? "d-none" : ""}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </span>
    </div>
  );
}

export default Paging;
