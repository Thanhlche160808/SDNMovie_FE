import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  isLoading,
  isFailing,
  isSuccess,
  isLogin,
} from "../../../redux/auth/slice";
import axios from "axios";
function Login() {
  const [show, setShow] = useState(false);
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      return toast.error("Vui lòng điền đầy đủ thông tin");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/user/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(res?.data);
      dispatch(isLogin(res?.data));
      navigate("/");
      return toast.success("Đăng nhập thành công");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data);
    }
  };
  // useEffect(() => {
  //   const btn = document.getElementById("login_btn");
  //   const handleEnter = (e) => {
  //     if (e.key === "Enter") {
  //       btn.click();
  //     }
  //   };
  //   passwordRef.current.addEventListener("keypress", handleEnter);
  //   return () => {
  //     passwordRef.current.removeEventListener("keypress", handleEnter);
  //   };
  // }, []);
  return (
    <div className="login">
      <div className="login_wrap">
        <h3>Login</h3>
        <div className="login_wrap_content">
          <input placeholder="Enter Username" ref={usernameRef} />
          <input
            placeholder="Enter password"
            ref={passwordRef}
            type={show ? "text" : "password"}
          />
        </div>
        <div
          style={{
            textAlign: "start",
          }}
        >
          <input
            type="checkbox"
            style={{
              marginLeft: "4px",
            }}
            onClick={() => setShow(!show)}
          />
          <span
            style={{
              marginLeft: "10px",
              color: "#fff",
            }}
          >
            Show
          </span>
        </div>
        <button
          className="btn"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
          }}
          id="login_btn"
          onClick={handleLogin}
        >
          Login
        </button>
        <div
          style={{
            marginTop: "20px",
            textAlign: "right",
            color: "#fff",
            cursor: "pointer",
            transition: "0.5s",
          }}
          className="login_register"
        >
          <Link to="/auth/register"> Register ?</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
