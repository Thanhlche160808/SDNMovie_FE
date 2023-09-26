import React, { useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../../redux/auth/slice";
import { toast } from "react-toastify";
import axios from "axios";
function RightTypeMovie({ hot }) {
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const handleSave = async () => {
    if (!auth?.user) {
      return toast.error("Bạn phải đăng nhập để lưu !");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/user/mark", {
        movieID: hot?._id,
        _id: auth?.user?._id,
      });
      dispatch(isSuccess());
      return toast.success(res.data);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error);
    }
  };
  return (
    <div className="right_type">
      <header className="right_type_header">
        <h2>Phim Hot</h2>
      </header>
      <div className="right_type_body">
        <img src={hot?.image} />
        <div className="right_type_body_content">
          <h3>{hot?.name}</h3>
          <p>{hot?.content}</p>
          <div className="right_type_body_content_info">
            <span>Released Year: {hot?.datePub}</span>
            <span>
              {hot?.totalRate} <i className="fa-regular fa-star"></i>
            </span>
            <span>{hot?.typeMovie?.[0]?._id?.typeName}</span>
            <span>
              {hot?.view}
              <i className="fa-solid fa-eye"></i>
            </span>
          </div>
          <div className="right_type_body_content_option">
            <button
              style={{
                backgroundColor: "rgb(47, 128, 237)",
              }}
              onClick={() => {
                navigate(`/movie/${hot?.slug}`);
              }}
            >
              <i className="fa-solid fa-play"></i>
              <span>Xem</span>
            </button>
            <button style={{ backgroundColor: "#CE5959" }} onClick={handleSave}>
              <i className="fa-solid fa-bookmark"></i>
              <span>Lưu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightTypeMovie;
