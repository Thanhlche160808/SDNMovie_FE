import React from "react";
import "./style.scss";
function ReplyCard({ rep }) {
  return (
    <div className="reply">
      <div className="reply_header">
        <img src="https://www.gravatar.com/avatar/a9a1b0b5b7fe991f7e365c7afe80bf28" />
        <h3>{rep?.author}</h3>
      </div>
      <div className="reply_content">{rep?.content}</div>
    </div>
  );
}

export default ReplyCard;
