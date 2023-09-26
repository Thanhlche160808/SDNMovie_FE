import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";

function AddMovieSeason() {
  const dispatch = useDispatch();
  const nameRef = useRef("");
  const handleCreateNew = async () => {
    if (nameRef.current.value === "") {
      return toast.error("Điền đầy đủ thông tin !");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/movie/create", {
        movieName: nameRef.current.value,
      });
      console.log(res?.data);
      dispatch(isSuccess());
      nameRef.current.value = "";
      return toast.success("Thêm thành công !");
    } catch (error) {
      dispatch(isFailing());
      return toast.error("Có lỗi với server !");
    }
  };
  return (
    <div
      className="container"
      style={{
        marginTop: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <label
          style={{
            width: "20%",
            color: "#fff",
            fontSize: "20px",
          }}
        >
          Name :{" "}
        </label>
        <input
          style={{
            flex: "1",
            padding: "10px",
            outline: "none",
            borderRadius: "16px",
          }}
          ref={nameRef}
        />
      </div>
      <button className="btn btn-light mt-4" onClick={handleCreateNew}>
        Thêm
      </button>
    </div>
  );
}

export default AddMovieSeason;
