import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import "./style.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import axios from "axios";
function AddVideo() {
  const { slug } = useParams();
  const imgRef = useRef(null);
  const [imageCurrent, setImageCurrent] = useState("");
  const nameRef = useRef("");
  const videoRef = useRef("");
  const timeRef = useRef("");
  const dispatch = useDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    if (imgRef) {
      URL.revokeObjectURL(imageCurrent);
    }
    imgRef.current = acceptedFiles[0];
    setImageCurrent(url);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleCreateNew = async () => {
    if (
      nameRef.current.value === "" ||
      videoRef.current.value === "" ||
      timeRef.current.value === ""
    ) {
      return toast.error("Điền đầy đủ thông tin !");
    }
    let image = "";
    const formData = new FormData();
    formData.append("file", imgRef.current);
    formData.append("upload_preset", "dinhhoan");
    dispatch(isLoading());
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/db7xtr0t6/image/upload",
        formData
      );
      image = res?.data?.url;
    } catch (error) {
      return dispatch(isFailing());
    }
    try {
      const res = await axios.post("/api/movie_video/create", {
        name: nameRef.current.value,
        video: videoRef.current.value,
        image,
        time: timeRef.current.value,
        slug: slug,
      });
      dispatch(isSuccess());
      nameRef.current.value = "";
      videoRef.current.value = "";
      timeRef.current.value = "";
      console.log(res?.data);
      return toast.success("Thêm thành công !");
    } catch (error) {
      toast.error("Có lỗi với server !");
      return dispatch(isFailing());
    }
  };
  return (
    <div className="add_video container">
      <div className="add_video_warper">
        <div className="add_video_warper_item">
          <label>Name : </label>
          <input ref={nameRef} />
        </div>
        <div className="add_video_warper_item">
          <label>Link : </label>
          <input ref={videoRef} />
        </div>
        <div className="add_video_warper_item">
          <label>Time : </label>
          <input ref={timeRef} />
        </div>
        <div className="video_dropzone">
          <div {...getRootProps()} className="video_dropzone_wrap">
            <input {...getInputProps()} />
            <img src={imageCurrent} />
          </div>
        </div>
      </div>
      <button className="btn btn-light mt-4" onClick={handleCreateNew}>
        Thêm
      </button>
    </div>
  );
}

export default AddVideo;
