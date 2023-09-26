import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminMovieCard from "./AdminMovieCard";
import "./style.scss";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
function MovieManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovies] = useState([]);
  const { search } = useLocation();
  const [totalPage, setTotalPage] = useState(1);
  let page = new URLSearchParams(search).get("page") || 1;
  useEffect(() => {
    let here = true;
    const url = `/api/movie_season/home?page=${page}`;

    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setMovies(res?.data?.movies);
        setTotalPage(res?.data?.totalPage);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [search]);
  return (
    <div className="admin_manage">
      <header className="admin_manage_header">
        <h3
          style={{
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Quản lý phim
        </h3>
        <div className="admin_manage_header_option">
          <button
            className="btn btn-light"
            onClick={() => navigate("/admin/add_movie")}
          >
            Thêm phim
          </button>
          <button
            className="btn btn-light"
            onClick={() => navigate("/admin/add_movie_season")}
            style={{
              marginLeft: "20px",
            }}
          >
            Thêm phim cha
          </button>
        </div>
      </header>
      <div className="admin_manage_body">
        <div className="admin_manage_body_movie">
          {movie?.map((item, index) => {
            return <AdminMovieCard item={item} key={index + "movieManager"} />;
          })}
        </div>
      </div>
      <Pagination page={page} totalPage={totalPage} />
    </div>
  );
}

export default MovieManager;
