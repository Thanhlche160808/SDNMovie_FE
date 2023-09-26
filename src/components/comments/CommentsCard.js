import React, { useContext, useEffect, useState } from "react";
import "./style.scss";
import moment from "moment";
import ReplyInput from "./ReplyInput";
import ReplyCard from "./ReplyCard";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { UserStore } from "../../App";
function CommentsCard({ item, detail, update, setUpdate }) {
  const [reply, setReply] = useState(false);
  const auth = useSelector((state) => state?.auth);
  const { role } = useContext(UserStore);
  const handleDelete = async () => {
    let check = window.confirm("Bạn có muốn xóa comment này không ?");
    if (check) {
      try {
        const res = await axios.post("/api/comment/delete", {
          _id: item?._id,
        });
        setUpdate(!update);
        return toast.success(res?.data);
      } catch (error) {
        return toast.error(error);
      }
    }
  };
  return (
    <div>
      <div className="comment_card">
        <div className="comment_card_wrap">
          <div className="comment_card_wrap_header">
            <img src="https://www.gravatar.com/avatar/a9a1b0b5b7fe991f7e365c7afe80bf28" />
            <div className="comment_card_wrap_header_info">
              <h3>{item?.author}</h3>
              <span>{moment(item?.date).startOf("millisecond").fromNow()}</span>
            </div>
          </div>
          <div className="comment_card_wrap_content">{item?.content}</div>
          <div className="comment_card_wrap_content_option">
            <div className="comment_card_wrap_content_option_left">
              <span>
                <i className="fa-solid fa-thumbs-up"></i>0
              </span>
              <span>
                <i className="fa-solid fa-thumbs-down"></i>0
              </span>
            </div>
            <div className="comment_card_wrap_content_option_right">
              <span onClick={() => setReply(!reply)}>
                <i className="fa-solid fa-reply"></i>Trả lời
              </span>
              {auth?.user?.showName === item?.author ||
              role === "ROLE_ADMIN" ? (
                <span
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  onClick={handleDelete}
                >
                  <i className="fa-solid fa-trash"></i>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {reply && <ReplyInput item={item} detail={detail} />}
      {item?.replyComments?.map((item, index) => {
        return <ReplyCard rep={item} key={index + "rep"} />;
      })} */}
    </div>
  );
}

export default CommentsCard;
