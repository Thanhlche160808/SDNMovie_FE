import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Select from "react-select";
import "./style.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
function AddMovie() {
  const nameRef = useRef("");
  const imgRef = useRef(null);
  const contentRef = useRef("");
  const [listType, setListType] = useState([]);
  const totalRef = useRef("");
  const [chooseType, setChooseType] = useState([]);
  const [movies, setMovies] = useState([]);
  const dateRef = useRef("");
  const dispatch = useDispatch();
  const [img, setImg] = useState("");

  const optionsType = useMemo(() => {
    return listType.map((item) => {
      return {
        label: item?.typeName,
        value: { slug: item?.slug, _id: item?._id },
      };
    });
  }, [listType]);
  useEffect(() => {
    dispatch(isLoading());
    axios
      .get("/api/type/getAll")
      .then((res) => {
        dispatch(isSuccess());
        return setListType(res?.data);
      })
      .catch((err) => {
        dispatch(isFailing());
        return toast.error("Có lỗi với server");
      });
  }, []);
  const onDrop = useCallback((acceptedFiles) => {
    const url = URL.createObjectURL(acceptedFiles[0]);
    if (imgRef) {
      URL.revokeObjectURL(img);
    }
    imgRef.current = acceptedFiles[0];
    setImg(url);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleCreateNewMovie = async () => {
    if (
      nameRef.current.value === "" ||
      contentRef.current.value === "" ||
      totalRef.current.value === ""
    ) {
      return toast.error("Enter all fields");
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
    console.log({
      name: nameRef.current.value,
      content: contentRef.current.value,
      totalChap: totalRef.current.value,
      image,
      typeMovie: chooseType.map((item) => {
        return { slug: item?.value?.slug, _id: item?.value?._id };
      }),
    });
    try {
      const res = await axios.post("/api/movie_season/create", {
        name: nameRef.current.value,
        content: contentRef.current.value,
        totalChap: totalRef.current.value,
        image,
        datePub: dateRef.current.value,
        typeMovie: chooseType.map((item) => {
          return { slug: item?.value?.slug, _id: item?.value?._id };
        }),
      });
      dispatch(isSuccess());
      console.log(res?.data);
      return toast.success("Thêm thành công !");
    } catch (error) {
      dispatch(isFailing());
      return toast.error("Có lỗi với server");
    }
  };
  return (
    <div className="add_movie">
      <header className="add_movie_header">
        <h3
          style={{
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Thêm Phim
        </h3>
      </header>
      <div className="add_movie_body container">
        <div className="add_movie_body_input">
          <label>Name : </label>
          <input ref={nameRef} type="text" />
        </div>
        <div className="add_movie_body_input">
          <label>Content : </label>
          <textarea
            ref={contentRef}
            style={{ flex: 1, outline: "none", borderRadius: "16px" }}
          />
        </div>
        <div className="add_movie_body_input">
          <label>Total chap : </label>
          <input ref={totalRef} type="number" />
        </div>
        <div className="add_movie_body_input">
          <label>Date : </label>
          <input ref={dateRef} type="number" />
        </div>
        <div className="add_movie_body_input">
          <label>Thể loại : </label>
          <Select
            className="add_movie_select"
            options={optionsType}
            isMulti
            onChange={setChooseType}
          />
        </div>
        <div className="dropzone_wrap">
          <div {...getRootProps()} className="dropzone_wrap_input">
            <input {...getInputProps()} />
            <img src={img} />
          </div>
        </div>
        <button
          className="btn btn-light"
          style={{ marginTop: "20px" }}
          onClick={handleCreateNewMovie}
        >
          Thêm
        </button>
      </div>
    </div>
  );
}

export default AddMovie;
