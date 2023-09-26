import React, { useContext, useEffect, useState } from "react";
import SwiperTypeMovie from "./SwiperTypeMovie";
import "./style.scss";
import { useDispatch } from "react-redux";
import { UserStore } from "../../../App";
import { isFailing, isLoading, isSuccess } from "../../../redux/auth/slice";
import axios from "axios";
function FreeTypeMovie({ type }) {
  const dispatch = useDispatch();
  const { cache } = useContext(UserStore);
  const [movies, setMovies] = useState([]);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    let here = true;
    const url = `/api/movie_season/type?type=${type}`;
    if (cache.current[url]) {
      setDetail(cache.current[url]?.detail);
      return setMovies(cache.current[url]?.movies);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setMovies(res?.data?.movies);
        setDetail(res?.data?.detail);
        console.log(res?.data);
        cache.current[url] = res?.data;
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
    <div className="free_type">
      <SwiperTypeMovie movies={movies} detail={detail} />
    </div>
  );
}

export default FreeTypeMovie;
