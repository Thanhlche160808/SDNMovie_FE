import React from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { isLogOut } from "../../redux/auth/slice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Mark from "../mark/Mark";
import Payment from "../payment/Payment";
function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);
  const { slug } = useParams();
  return (
    <div className="profile container">
      <header className="profile_header">
        <h3>Chào, {auth?.user?.showName}</h3>
      </header>
      <div className="profile_body">
        <div className="profile_body_top">
          <div className="profile_body_top_info">
            <div className="profile_body_top_info_avatar">
              <img src="https://www.gravatar.com/avatar/f18c8fd8871e02d3a3e542c11582c301" />
            </div>
            <div className="profile_body_top_info_user">
              <h3>{auth?.user?.showName}</h3>
              <span>ID : {auth?.user?.userID}</span>
            </div>
            <div className="profile_body_top_info_option">
              <div
                className={
                  slug === "payment"
                    ? "profile_body_top_info_option_item active"
                    : "profile_body_top_info_option_item"
                }
                onClick={() => navigate("/auth/profile/payment")}
              >
                Tài khoản
              </div>
              <div
                className={
                  slug === "mark"
                    ? "profile_body_top_info_option_item active"
                    : "profile_body_top_info_option_item"
                }
                onClick={() => navigate("/auth/profile/mark")}
              >
                Bộ sưu tập
              </div>
            </div>
            <div
              className="profile_body_top_info_out"
              onClick={() => {
                dispatch(isLogOut());
                toast.success("Đăng xuất thành công !");
                return navigate("/");
              }}
            >
              Đăng xuất <i class="fa-solid fa-right-from-bracket"></i>
            </div>
          </div>
        </div>
        {slug === "mark" && <Mark />}
        {slug === "payment" && <Payment />}
      </div>
    </div>
  );
}

export default Profile;
