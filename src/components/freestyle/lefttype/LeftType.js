import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoading, isFailing, isSuccess } from "../../../redux/auth/slice";
import { toast } from "react-toastify";
import axios from "axios";
function LeftType({ view }) {
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
        movieID: view?._id,
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
    <div className="left_type">
      <header className="left_type_header">
        <h2>Best Choice</h2>
      </header>
      <div className="left_type_body">
        <img src={view?.image} />
        <div className="left_type_body_content">
          <h3>{view?.name}</h3>
          <p>{view?.content}</p>
          <div className="left_type_body_content_info">
            <span>Released Year: {view?.datePub}</span>
            <span>
              {view?.totalRate} <i className="fa-regular fa-star"></i>
            </span>
            <span>{view?.typeMovie?.[0]?._id?.typeName}</span>
            <span>
              {view?.view} <i className="fa-solid fa-eye"></i>
            </span>
          </div>
          <div className="left_type_body_content_option">
            <button
              style={{
                backgroundColor: "rgb(47, 128, 237)",
              }}
              onClick={() => navigate(`/movie/${view?.slug}`)}
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

export default LeftType;
