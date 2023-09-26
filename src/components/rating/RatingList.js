import React, { useContext, useEffect, useState } from "react";
import RatingCard from "./RatingCard";
import { UserStore } from "../../App";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function RatingList({ type, setLength, update }) {
  const [rating, setRating] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    let here = true;
    let url = "";
    if (type === "rate") {
      url = `api/${type}/movie/${slug}`;
    }
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setRating(res?.data);
        setLength(res?.data?.length);
      })
      .catch((err) => {
        return toast.error(err);
      });
    return () => {
      here = false;
    };
  }, [update]);

  return (
    <div className="rating_list">
      {rating?.map((rate, index) => {
        return <RatingCard rate={rate} key={index + "rate"} />;
      })}
    </div>
  );
}

export default RatingList;
