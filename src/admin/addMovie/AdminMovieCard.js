import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
function AdminMovieCard({ item }) {
  const navigate = useNavigate();
  return (
    <div className="admin_movie_card">
      <div className="admin_movie_card_img">
        <img src={item?.image} />
      </div>
      <div className="admin_movie_card_content">
        <h3>{item?.name}</h3>
        <div className="admin_movie_card_content_option">
          <button
            className="btn btn-light"
            style={{
              marginRight: "10px",
            }}
            onClick={() => navigate(`/admin/add_video/${item?.slug}`)}
          >
            Upload
          </button>
          <button
            className="btn btn-success"
            style={{
              marginRight: "10px",
            }}
            onClick={() => navigate(`/admin/add_season/${item?.slug}`)}
          >
            Thêm phần
          </button>
          <button className="btn btn-warning">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default AdminMovieCard;
