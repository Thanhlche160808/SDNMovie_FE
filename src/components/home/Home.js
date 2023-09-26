import React, { Suspense, useContext, useEffect, useState } from "react";
import Swiper from "../swiper/Swiper";
import "./style.scss";
import { UserStore } from "../../App";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "../pagination/Pagination";
import LoadingSmall from "../loadingSmall/LoadingSmall";
import Seo from "../seo/Seo";
const MovieList = React.lazy(() => import("../movieList/MovieList"));
function Home() {
  const [homeMovie, setHomeMovie] = useState([]);
  const { cache } = useContext(UserStore);
  const [swiperMovie, setSwiperMovie] = useState([]);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [totalPage, setTotalPage] = useState(1);
  let page = new URLSearchParams(search).get("page") || 1;
  useEffect(() => {
    let here = true;
    const url = "/api/movie_season/getAll";
    if (cache.current[url]) {
      setSwiperMovie(cache.current[url]?.swiper);
      return;
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setSwiperMovie(res?.data?.swiper);
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
  useEffect(() => {
    let here = true;
    const url = `/api/movie_season/home?page=${page}`;
    if (cache.current[url]) {
      setTotalPage(cache.current[url]?.totalPage);
      return setHomeMovie(cache.current[url]?.movies);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setHomeMovie(res?.data?.movies);
        setTotalPage(res?.data?.totalPage);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [search]);
  useEffect(() => {
    window.scrollTo({
      top: 200,
      behavior: "smooth",
    });
  }, [search]);

  return (
    <div className="home">
      <Seo
        title={"Anime Movies Hay - Xem Phim Anime, Movies mới nhất"}
        img={
          "https://res.cloudinary.com/db7xtr0t6/image/upload/v1677930694/Anime_Project/Logo_kkus6y.png"
        }
        description={
          "Xem phim anime vietsub, movies online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime, movies vietsub miễn phí tốt nhất. Liên tục cập nhật các anime sớm nhất từ các fansub Việt Nam."
        }
        keyword={`anime, animetv, anime hay, anime vietsub, anime vietsub online, xem anime, anime tv, download anime vietsub, anime hd, tai anime, anime moi nhat, phim anime, hoat hinh nhat, anime tv`}
        url={"/"}
      />
      <div className="home_silde">
        <Swiper swiperMovie={swiperMovie} />
      </div>
      <div className="home_movie">
        <h3
          className="container"
          style={{
            color: "#e0e0e0",
            textAlign: "start",
            marginTop: "30px",
          }}
        >
          Phim mới
        </h3>
        <Suspense fallback={<LoadingSmall />}>
          {" "}
          <MovieList movie={homeMovie} />
        </Suspense>
      </div>
      <Pagination page={page} totalPage={totalPage} />
    </div>
  );
}

export default Home;
