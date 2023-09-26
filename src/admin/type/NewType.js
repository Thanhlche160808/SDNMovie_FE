import React from "react";
import { Link } from "react-router-dom";

function NewType() {
  return (
    <div>
      <header
        style={{
          fontSize: "20px",
          color: "#fff",
          fontWeight: "500",
          margin: "10px 0",
        }}
      >
        Quản lý thể loại
      </header>
      <button className="btn btn-light">
        <Link
          to={"/admin/add_type"}
          style={{
            textDecoration: "none",
          }}
        >
          Thêm thể loại
        </Link>
      </button>
    </div>
  );
}

export default NewType;
