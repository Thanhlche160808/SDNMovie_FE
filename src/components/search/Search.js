import React, { useContext, useEffect, useState } from "react";
import MovieList from "../movieList/MovieList";
import "./style.scss";
import { useLocation } from "react-router-dom";
import { UserStore } from "../../App";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import axios from "axios";
function Search() {
  const [list, setList] = useState([]);
  const { search } = useLocation();
  const { cache } = useContext(UserStore);
  const [check, setCheck] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let name = new URLSearchParams(search).get("text");
    let here = true;
    let url = `/api/movie_season/search?name=${name}&limit=${18}`;
    if (cache.current[url]) {
      console.log(cache);
      return setList(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        if (res?.data?.length !== 0) {
          setList(res?.data);
          console.log(res?.data);
          cache.current[url] = res?.data;
          setCheck(false);
        } else {
          setCheck(true);
          cache.current[url] = res?.data;
        }
        return dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [search]);
  return (
    <div className="type">
      <div className="type_header container">
        <h1>Tìm kiếm</h1>
      </div>
      {check ? (
        <h2
          style={{
            color: "#fff",
            fontWeight: "400",
            fontFamily: "Rubik, sans-serif",
          }}
        >
          Không có phim
        </h2>
      ) : (
        <MovieList movie={list} />
      )}
    </div>
  );
}

export default Search;
