import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import { motion } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserStore } from "../../App";
import CommentsCard from "./CommentsCard";
function Comments({ detail }) {
  const [emoji, setEmoji] = useState(false);
  const commentRef = useRef("");
  const auth = useSelector((state) => state?.auth);
  const { socket } = useContext(UserStore);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [update, setUpdate] = useState(false);
  const handleComments = async () => {
    if (commentRef.current.value === "") {
      return toast.error("Comment đi ba !");
    }
    if (auth?.user) {
      try {
        socket.emit("send", {
          content: commentRef.current.value,
          author: auth?.user?.showName,
          movie: detail?._id,
        });
        commentRef.current.value = "";
      } catch (error) {
        return toast.error(error);
      }
    } else {
      return toast.error("Đăng nhập để comment !");
    }
  };

  useEffect(() => {
    if (detail) {
      let here = true;
      const url = `/api/comment/movie?movie=${detail?._id}&page=${1}`;
      axios
        .get(url)
        .then((res) => {
          if (!here) {
            return;
          }
          setTotal(res?.data?.totalPage);
          setComments(res?.data?.comments);
          console.log(res?.data);
        })
        .catch((err) => {
          return toast.error(err);
        });
      return () => {
        here = false;
      };
    }
  }, [detail, update]);
  useEffect(() => {
    if (socket) {
      socket.on("receive", (data) => {
        console.log(data);
        const ar = comments;
        const some = ar.some((item) => item?._id === data?._id);
        if (some) {
          return;
        }
        setComments((pre) => [data, ...pre]);
      });
    }
  }, [socket]);
  const handleLoad = async () => {
    setPage((page) => page + 1);
    try {
      const res = await axios.get(
        `/api/comment/movie?movie=${detail?._id}&page=${page + 1}`
      );
      setComments([...comments, ...res?.data?.comments]);
    } catch (error) {
      return;
    }
  };
  return (
    <div>
      <motion.div
        className="comment"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <textarea placeholder="Thảo luận đi các bạn !" ref={commentRef} />
        <span>
          <i
            className="fa-solid fa-face-smile"
            onClick={() => setEmoji(!emoji)}
          ></i>
        </span>
        {emoji && (
          <motion.div
            className="emoji"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <EmojiPicker
              onEmojiClick={(e) => {
                setEmoji(false);
                return (commentRef.current.value =
                  commentRef.current.value + ` ${e.emoji}`);
              }}
            />
          </motion.div>
        )}
        <motion.button
          whileHover={{
            backgroundColor: "#fff",
            color: "#000",
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            width: "180px",
            alignItems: "center",
            height: "50px",
            borderRadius: "16px",
            backgroundColor: "#2f80ed",
            color: "#e0e0e0",
            fontSize: "14px",
            textTransform: "uppercase",
            fontWeight: "500",
          }}
          onClick={handleComments}
        >
          Gửi
        </motion.button>
      </motion.div>
      <div className="comment_list_wrap">
        {comments?.map((item, index) => {
          return (
            <CommentsCard
              item={item}
              key={index + "comment"}
              detail={detail}
              update={update}
              setUpdate={setUpdate}
            />
          );
        })}
      </div>
      <button
        onClick={handleLoad}
        className={total === page || page > total ? "d-none" : ""}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          width: "180px",
          alignItems: "center",
          height: "50px",
          borderRadius: "16px",
          backgroundColor: "#2f80ed",
          color: "#e0e0e0",
          fontSize: "14px",
          textTransform: "uppercase",
          fontWeight: "500",
        }}
      >
        Tải Thêm
      </button>
    </div>
  );
}

export default Comments;
