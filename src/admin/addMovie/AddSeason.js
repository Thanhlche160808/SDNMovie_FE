import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import { toast } from "react-toastify";
import axios from "axios";
function AddSeason() {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [chooseMovie, setChooseMovie] = useState(null);
  const nameRef = useRef("");
  const options = useMemo(() => {
    return list?.map((item) => {
      return {
        label: item?.movieName,
        value: item?._id,
      };
    });
  }, [list]);
  useEffect(() => {
    dispatch(isLoading());
    axios
      .get("/api/movie/getAll")
      .then((res) => {
        dispatch(isSuccess());
        return setList(res?.data);
      })
      .catch((err) => {
        dispatch(isFailing());
        return toast.error("Co loi voi server");
      });
  }, []);
  const handleCreate = async () => {
    if (nameRef.current.value === "") {
      return toast.error("Điền đầy đủ thông tin !");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/movie/add_season", {
        seasonName: nameRef.current.value,
        slug: slug,
        _id: chooseMovie?.value,
      });
      dispatch(isSuccess());
      nameRef.current.value = "";
      return toast.success(res?.data);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error);
    }
  };
  return (
    <div className="add_season">
      <div className="add_season_wrap container">
        <div className="add_season_wrap_item">
          <label>Season name : </label>
          <input ref={nameRef} />
        </div>
        <div className="add_season_wrap_item">
          <label>Season : </label>
          <Select
            className="season_select"
            options={options}
            onChange={setChooseMovie}
          />
        </div>
      </div>
      <button className="btn btn-success" onClick={handleCreate}>
        Thêm
      </button>
    </div>
  );
}

export default AddSeason;
