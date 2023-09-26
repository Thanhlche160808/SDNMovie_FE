import React, { useEffect, useState } from "react";
import MovieList from "../../components/movieList/MovieList";
import "../profile/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import axios from "axios";
function Mark() {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    let here = true;
    const url = `/api/user/movies?_id=${auth?.user?._id}`;
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setMovies(res?.data?.mark);
        console.log(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  return (
    <div
      className="user_mark"
      style={{
        marginTop: "30px",
      }}
    >
      {movies?.length === 0 ? (
        <h1
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Không có bộ phim nào được lưu !
        </h1>
      ) : (
        <MovieList movie={movies} />
      )}
    </div>
  );
}

export default Mark;
