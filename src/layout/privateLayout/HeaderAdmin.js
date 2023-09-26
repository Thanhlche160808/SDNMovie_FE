import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../defaultLayout/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { isLogOut } from "../../redux/auth/slice";
function HeaderAdmin() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="container header">
        <div className="header_img">
          <img src="https://res.cloudinary.com/db7xtr0t6/image/upload/v1677930694/Anime_Project/Logo_kkus6y.png" />
        </div>
        <div className="header_nav">
          <div
            className="header_nav_item"
            onClick={() => {
              dispatch(isLogOut());
              return navigate("/");
            }}
          >
            Trang chủ
          </div>
          <div
            className="header_nav_item"
            onClick={() => navigate("/admin/movie_manager")}
          >
            Quản lý Phim
          </div>
          <div
            className="header_nav_item"
            onClick={() => navigate("/admin/new_type")}
          >
            Quản lý thể loại
          </div>
          <div className="header_nav_item">Quản lý user</div>
        </div>
        <div className="header_option">
          <div className="header_option_search">
            <input
              placeholder="Nhập phim muốn tìm ...."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          {auth?.user ? (
            <div
              className="header_user"
              onClick={() => navigate("/admin/movie_manager")}
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
      {search && (
        <div className="search_content">
          <div className="search_content_wrap">
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>{" "}
            <div className="search_content_wrap_item">
              <img src="https://viettoons.tv/media/movie/images/2023_02_12/56092b9cdbbc4217b93c.jpg" />
              <p>Kick Buttowski</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default HeaderAdmin;
