import React, { useContext, useEffect, useState } from "react";
import MovieList from "./MovieList";
import { useLocation, useParams } from "react-router-dom";
import { UserStore } from "../../App";
import { useDispatch } from "react-redux";
import axios from "axios";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import Pagination from "../pagination/Pagination";
function TypeMovies() {
  const { slug } = useParams();
  const { cache } = useContext(UserStore);
  const [movie, setMovie] = useState([]);
  const [detail, setDetail] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const { search } = useLocation();
  const dispatch = useDispatch();
  let page = new URLSearchParams(search).get("page") || 1;
  useEffect(() => {
    let here = true;
    const url = `/api/type/movies?type=${slug}&page=${page}`;
    if (cache.current[url]) {
      setDetail(cache.current[url]?.typeDetail);
      return setMovie(cache.current[url]?.movies);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setMovie(res?.data?.movies);
        setDetail(res?.data?.typeDetail);
        setTotalPage(res?.data?.totalPage);
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
  }, [search, slug]);
  useEffect(() => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  }, [search]);
  return (
    <div className="type">
      <div className="type_header container">
        <h1>{detail?.typeName}</h1>
        <div className="type_header_nav">
          <span>Home</span>
          <span>
            <i className="fa-solid fa-arrow-right"></i>
          </span>
          <span>{detail?.typeName}</span>
        </div>
      </div>
      <MovieList movie={movie} />
      <Pagination page={page} totalPage={totalPage} />
    </div>
  );
}

export default TypeMovies;
