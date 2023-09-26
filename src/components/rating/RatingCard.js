import React from "react";
import "./style.scss";
import moment from "moment/moment";
function RatingCard({ rate }) {
  return (
    <div className="rating_card_wrap">
      <div className="rating_card_header">
        <div className="rating_card_header_left">
          <img src="https://www.gravatar.com/avatar/a9a1b0b5b7fe991f7e365c7afe80bf28" />
          <div className="rating_card_header_left_info">
            <span className="rating_card_header_left_info_name">
              {rate?.userID?.showName}
            </span>
            <span className="rating_card_header_left_info_time">
              {moment(rate?.updatedAt).startOf("millisecond").fromNow()}
            </span>
          </div>
        </div>
        <div className="rating_card_header_right">
          <i className="fa-regular fa-star"></i>
          {rate?.rate}
        </div>
      </div>
      <div className="rating_card_body">
        <p
          style={{
            marginBottom: 0,
            color: "#fff",
            fontSize: "16px",
            lineHeight: "26px",
            padding: "20px 0 0",
            textAlign: "start",
          }}
        >
          {rate?.content}
        </p>
      </div>
    </div>
  );
}

export default RatingCard;
