import React from "react";
import "./style.scss";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function HeaderMobile() {
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  return (
    <div className="header_mobile">
      <img
        src="https://res.cloudinary.com/db7xtr0t6/image/upload/v1677930694/Anime_Project/Logo_kkus6y.png"
        onClick={() => navigate("/")}
      />
      <span>
        <i className="fa-solid fa-bars" onClick={() => setShow(true)}></i>
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            className="header_mobile_content"
            key={"modal"}
            initial={{ y: -500 }}
            animate={{ y: 0 }}
            exit={{ y: -500 }}
            transition={{ duration: 0.8 }}
          >
            <ul>
              <li>
                <Link to={"/"} onClick={() => setShow(false)}>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to={"/tim-kiem"} onClick={() => setShow(false)}>
                  Bạn đang tìm ?
                </Link>
              </li>
              <li>
                <Link to={"/free"} onClick={() => setShow(false)}>
                  Không biết xem gì ?
                </Link>
              </li>
              <li>
                <Link
                  to={!auth?.user ? "/auth/login" : `/auth/profile/mark`}
                  onClick={() => setShow(false)}
                >
                  Bộ sưu tập
                </Link>
              </li>
              <li>
                {auth?.user ? (
                  <Link
                    to={"/auth/profile/mark"}
                    onClick={() => setShow(false)}
                    style={{ color: "#2f80ed" }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{
                        marginRight: "10px",
                      }}
                    ></i>{" "}
                    {auth?.user?.showName}
                  </Link>
                ) : (
                  <Link to={"/auth/login"} onClick={() => setShow(false)}>
                    Đăng nhập
                  </Link>
                )}
              </li>
            </ul>
            <span>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setShow(false)}
              ></i>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeaderMobile;
