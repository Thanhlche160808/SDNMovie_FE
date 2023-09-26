import React, { useContext, useEffect, useRef } from "react";
import "./style.scss";
import { motion } from "framer-motion";
import { UserStore } from "../../App";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function ReplyInput({ item, detail }) {
  const contentRef = useRef("");
  const { socket } = useContext(UserStore);
  const auth = useSelector((state) => state?.auth);
  const handleReply = async () => {
    if (contentRef.current.value === "" || !auth?.user) {
      return toast.error("Điền đủ !");
    }
  };

  return (
    <motion.div
      className="reply_input"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <textarea placeholder="Trả lời ..." ref={contentRef} />
      <button onClick={handleReply}>Gửi</button>
    </motion.div>
  );
}

export default ReplyInput;
