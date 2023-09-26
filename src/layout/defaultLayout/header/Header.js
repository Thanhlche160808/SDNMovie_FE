import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { UserStore } from "../../../App";
import axios from "axios";
import { debounce } from "debounce";
import { toast } from "react-toastify";
function Header() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const searchBtn = useRef(null);
  const { role } = useContext(UserStore);
  const searchRef = useRef("");
  const [movies, setMovies] = useState([]);
  const handleSearch = async () => {
    if (searchRef.current.value === "") {
      setMovies([]);
      return;
    }
    try {
      const res = await axios.get(
        `/api/movie_season/search?name=${searchRef.current.value}&limit=${9}`
      );
      setMovies(res?.data);
    } catch (error) {
      return toast.error(error);
    }
  };
  const handleNavigate = (item) => {
    searchRef.current.value = "";
    setMovies([]);
    return navigate(`/movie/${item?.slug}`);
  };
  useEffect(() => {
    const btn = document.getElementById("btn_search");
    const search = document.getElementById("input_search");
    const handleFilter = (e) => {
      if (searchRef.current.value === "") {
        return;
      }
      if (e.key === "Enter") {
        btn.click();
      }
    };
    search.addEventListener("keypress", handleFilter);
    return () => {
      search.removeEventListener("keypress", handleFilter);
    };
  }, []);
  return (
    <header className="header">
      <div className="container header">
        <div className="header_img">
          <img
            alt="logo"
            src="https://res.cloudinary.com/db7xtr0t6/image/upload/v1677930694/Anime_Project/Logo_kkus6y.png"
          />
        </div>
        <div className="header_nav">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <div className="header_nav_item">Trang chủ</div>
          </Link>
          <Link to={"/tim-kiem"} style={{ textDecoration: "none" }}>
            <div className="header_nav_item">Bạn đang tìm ?</div>
          </Link>
          <Link to={"/free"} style={{ textDecoration: "none" }}>
            <div className="header_nav_item">Không biết xem gì ?</div>
          </Link>
          <div
            className="header_nav_item"
            onClick={() => {
              if (auth?.user) {
                return navigate("/auth/profile/mark");
              }
              return navigate("/auth/login");
            }}
          >
            Bộ sưu tập
          </div>
        </div>
        <div className="header_option">
          <div className="header_option_search">
            <input
              placeholder="Nhập phim muốn tìm ...."
              ref={searchRef}
              onChange={debounce(handleSearch, 500)}
              id="input_search"
            />
            <i
              className="fa-solid fa-magnifying-glass"
              id="btn_search"
              onClick={() => {
                navigate(`/search?text=${searchRef.current.value}`);
                return (searchRef.current.value = "");
              }}
            ></i>
          </div>
          {auth?.user ? (
            <div
              className="header_user"
              onClick={() => {
                if (role === "ROLE_USER") {
                  return navigate("/auth/profile/mark");
                }
                return navigate("/admin/movie_manager");
              }}
            >
              <h3>{auth?.user?.showName}</h3>
              <i className="fa-regular fa-user"></i>
            </div>
          ) : (
            <div
              className="header_option_login"
              onClick={() => navigate("/auth/login")}
            >
              Đăng Nhập <i className="fa-solid fa-right-to-bracket"></i>
            </div>
          )}
        </div>
      </div>
      {searchRef.current.value && (
        <div className="search_content">
          <div className="search_content_wrap">
            {movies?.map((item, index) => {
              return (
                <div
                  className="search_content_wrap_item"
                  key={index + "search"}
                  onClick={() => handleNavigate(item)}
                >
                  <img src={item?.image} />
                  <p>{item?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
