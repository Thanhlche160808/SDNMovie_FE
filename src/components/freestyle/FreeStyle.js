import React, { useEffect, lazy, Suspense, useState, useContext } from "react";
import "./style.scss";
import LoadingSmall from "../loadingSmall/LoadingSmall";
import RightTypeMovie from "./righttype/RightTypeMovie";
import FreeTypeMovie from "./freetypemovie/FreeTypeMovie";
import { UserStore } from "../../App";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import axios from "axios";
import Seo from "../seo/Seo";
import { useLocation } from "react-router-dom";
const LeftType = lazy(() => import("./lefttype/LeftType"));

function FreeStyle() {
  const [hot, setHot] = useState(null);
  const [view, setView] = useState(null);
  const { cache } = useContext(UserStore);
  const url = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    let here = true;
    const url = `/api/movie_season/hot`;
    if (cache.current[url]) {
      setView(cache.current[url]?.mostView);
      return setHot(cache.current[url]?.hot);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setView(res?.data?.mostView);
        setHot(res?.data?.hot);
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
    <div className="free">
      <Seo
        title={"Anime Movies Hay - Xem Phim Anime, Movies mới nhất"}
        img={
          "https://res.cloudinary.com/db7xtr0t6/image/upload/v1677930694/Anime_Project/Logo_kkus6y.png"
        }
        description={
          "Xem phim anime vietsub, movies online xem trên điện thoại di động và máy tính nhanh nhất. Là một website xem phim anime, movies vietsub miễn phí tốt nhất. Liên tục cập nhật các anime sớm nhất từ các fansub Việt Nam."
        }
        keyword={`anime, animetv, anime hay, anime vietsub, anime vietsub online, xem anime, anime tv, download anime vietsub, anime hd, tai anime, anime moi nhat, phim anime, hoat hinh nhat, anime tv`}
        url={url?.pathname}
      />
      <h1>
        YOUR GALAXY{" "}
        <i className="fa-solid fa-earth-asia" style={{ color: "#2f80ed" }}></i>
      </h1>
      <div className="free_container">
        <FreeTypeMovie type={"anime"} />
        <RightTypeMovie hot={hot} />
        <FreeTypeMovie type={"au-my"} />
        <Suspense fallback={<LoadingSmall />}>
          <LeftType view={view} />
        </Suspense>
        <FreeTypeMovie type={"china"} />
      </div>
    </div>
  );
}

export default FreeStyle;
