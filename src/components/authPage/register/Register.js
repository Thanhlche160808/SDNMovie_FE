import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../../redux/auth/slice";
import { toast } from "react-toastify";
function Register() {
  const [show, setShow] = useState(false);
  const showRef = useRef("");
  const nameRef = useRef("");
  const passRef = useRef("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async () => {
    if (
      showRef.current.value === "" ||
      nameRef.current.value === "" ||
      passRef.current.value === ""
    ) {
      return toast.error("Xin điền đầy đủ thông tin !");
    }
    try {
      dispatch(isLoading());
      await axios.post("/api/user/create", {
        showName: showRef.current.value,
        username: nameRef.current.value,
        password: passRef.current.value,
      });
      dispatch(isSuccess());
      navigate("/auth/login");
      return toast.success("Đăng ký thành công !");
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error);
    }
  };
  return (
    <div className="login">
      <div className="login_wrap">
        <h3>Register</h3>
        <div className="login_wrap_content">
          <input placeholder="Enter Show Name" ref={showRef} />
          <input placeholder="Enter Username" ref={nameRef} />
          <input
            type={show ? "text" : "password"}
            ref={passRef}
            placeholder="Enter password"
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
          onClick={handleRegister}
        >
          Register
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
          <Link to="/auth/login"> Login ?</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
