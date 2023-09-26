import React, { useRef, useState } from "react";
import "./style.scss";
import { motion } from "framer-motion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import { useNavigate, useParams } from "react-router-dom";
function Rating({ detail, update, setUpdate }) {
  const [star, setStar] = useState(null);
  const { slug } = useParams();
  const [hover, setHover] = useState(null);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const contentRef = useRef("");
  const starArr = Array(10).fill(0);
  const navigate = useNavigate();
  const handleRate = async () => {
    if (!star || contentRef.current.value === "") {
      return toast.error("Bạn phải đánh giá và feedback đầy đủ !");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/rate/rating", {
        movieSeasonID: detail?._id,
        userID: auth?.user?._id,
        content: contentRef.current.value,
        rate: star,
        MovieSlug: slug,
      });
      console.log(res?.data);
      dispatch(isSuccess());
      setStar(null);
      setUpdate(!update);
      contentRef.current.value = "";
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      console.log(error?.response);
      return;
    }
  };
  return (
    <motion.div
      className="rating"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 0.5 }}
    >
      <div
        style={{
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <div className="rating_body">
            {starArr.map((item, index) => {
              return (
                <i
                  onMouseOver={() => setHover(index + 1)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setStar(index + 1)}
                  className={
                    hover
                      ? hover > index
                        ? "fa-solid fa-star"
                        : "fa-regular fa-star"
                      : star > index
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                  }
                  key={index}
                ></i>
              );
            })}
          </div>
        </div>
        <div className="rating_content">
          <textarea
            placeholder="Đánh giá cho tui vui đi nào iu !"
            ref={contentRef}
          />
        </div>
        {auth?.user ? (
          <motion.button
            whileHover={{
              backgroundColor: "#fff",
              color: "#000",
            }}
            transition={{
              duration: 0.3,
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              width: "180px",
              alignItems: "center",
              height: "50px",
              borderRadius: "16px",
              backgroundColor: "#2f80ed",
              color: "#e0e0e0",
              fontSize: "14px",
              textTransform: "uppercase",
              fontWeight: "500",
            }}
            onClick={handleRate}
          >
            Gửi
          </motion.button>
        ) : (
          <motion.button
            whileHover={{
              backgroundColor: "#fff",
              color: "#000",
            }}
            transition={{
              duration: 0.3,
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              width: "180px",
              alignItems: "center",
              height: "50px",
              borderRadius: "16px",
              backgroundColor: "#2f80ed",
              color: "#e0e0e0",
              fontSize: "14px",
              textTransform: "uppercase",
              fontWeight: "500",
            }}
            onClick={() => navigate("/auth/login")}
          >
            Đăng nhập
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default Rating;
