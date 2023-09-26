import React, { useContext, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import "./style.scss";
import MovieList from "../movieList/MovieList";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import axios from "axios";
import { toast } from "react-toastify";
import { UserStore } from "../../App";
import Paging from "./Paging";
import Seo from "../seo/Seo";
function FilterMovie() {
  const [optionSortType, setOptionSortType] = useState(null);
  const [optonSortView, setOptionSortView] = useState(null);
  const { search } = useLocation();
  const url = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listType, setListType] = useState([]);
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const { cache } = useContext(UserStore);
  const optionsType = useMemo(() => {
    const all = [{ label: "Tất cả", value: "all" }];
    return [
      ...all,
      ...listType?.map((item) => {
        return {
          label: item?.typeName,
          value: item?.slug,
        };
      }),
    ];
  }, [listType]);

  const optionsView = useMemo(() => {
    return [
      {
        label: "Nhiều lượt xem",
        value: "desc",
      },
      {
        label: "Đánh giá cao",
        value: "rate",
      },
    ];
  }, []);
  const handleSearching = () => {
    const sort = {
      type: optionSortType?.value || null,
      view: optonSortView?.value || null,
    };
    sort.page = 1;
    let searchingURL = "";
    if (!sort.type) {
      searchingURL = new URLSearchParams({
        view: optonSortView?.value,
        type: "all",
        page: 1,
      }).toString();
    }
    if (!sort?.view) {
      searchingURL = new URLSearchParams({
        type: optionSortType?.value,
        view: "desc",
        page: 1,
      });
    }
    if (!sort?.type && !sort?.view) {
      searchingURL = new URLSearchParams({
        type: "all",
        view: "desc",
        page: 1,
      }).toString();
    }
    if (sort?.type && sort?.view) {
      searchingURL = new URLSearchParams(sort).toString();
    }
    navigate("?" + searchingURL);
  };
  useEffect(() => {
    let here = true;
    const url = "api/type/getAll";
    if (cache.current[url]) {
      return setListType(cache.current[url]);
    }
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setListType(res?.data);
        cache.current[url] = res?.data;
      })
      .catch((err) => {
        return toast.error("Có lỗi với server");
      });
    return () => {
      here = false;
    };
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const type = new URLSearchParams(search).get("type") || "all";
    const view = new URLSearchParams(search).get("view") || "desc";
    const page = new URLSearchParams(search).get("page") || 1;
    const filter = {
      type,
      view,
      page,
    };
    const sortURL = new URLSearchParams(filter).toString();
    let here = true;
    const url = `/api/movie_season/filter?${sortURL}`;
    if (cache.current[url]) {
      setTotalPage(cache.current[url]?.totalPage);
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
    const type = new URLSearchParams(search).get("type") || null;
    const view = new URLSearchParams(search).get("view") || null;
    const viewIndex = optionsView?.find((item) => item?.value === view);
    if (type === "all" || type === null) {
      if (view !== null) {
        setOptionSortView({ ...viewIndex });
      } else {
        setOptionSortView({
          label: "Nhiều lượt xem",
          value: "desc",
        });
      }
      setOptionSortType({ label: "Tất cả", value: "all" });
      return;
    } else {
      const index = listType?.find((item) => item?.slug === type);
      setOptionSortView({ ...viewIndex });
      setOptionSortType({ label: index?.typeName, value: index?.slug });
    }
  }, [listType]);

  return (
    <div className="filter_movie">
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
      <header className="filter_movie_header">
        <Select
          options={optionsType}
          className="select_item"
          placeholder="Chọn thể loại"
          value={optionSortType}
          onChange={setOptionSortType}
        />
        <Select
          options={optionsView}
          className="select_item"
          placeholder="Chọn lượt xem"
          value={optonSortView}
          onChange={setOptionSortView}
        />

        <button className="btn btn-light" onClick={handleSearching}>
          Tìm kiếm
        </button>
      </header>
      <MovieList movie={movies} />
      <Paging totalPage={totalPage} />
    </div>
  );
}

export default FilterMovie;
