import axios from "axios";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
function AddType() {
  const typeRef = useRef("");
  const dispatch = useDispatch();
  const handleCreate = async () => {
    if (typeRef.current.value === "") {
      return toast.error("Điền đầy đủ thông tin !");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/type/create", {
        typeName: typeRef.current.value,
      });
      console.log(res.data);
      dispatch(isSuccess());
      typeRef.current.value = "";
      return toast.success("Thêm Thể loại mới thành công !");
    } catch (error) {
      dispatch(isFailing());
      return toast.error("Đã có lỗi với server");
    }
  };
  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          marginTop: "20px",
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
          Thể loại :{" "}
        </label>
        <input
          style={{
            flex: "1",
            padding: "10px",
            borderRadius: "16px",
            outline: "none",
          }}
          ref={typeRef}
        />
      </div>
      <button
        className="btn btn-light"
        onClick={handleCreate}
        style={{
          marginTop: "30px",
        }}
      >
        Thêm
      </button>
    </div>
  );
}

export default AddType;
