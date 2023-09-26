import React, { useEffect } from "react";
import "./style.scss";
function Payment() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div
      className="payment"
      style={{
        marginTop: "30px",
      }}
    >
      <div className="payment_body">
        <i class="fa-sharp fa-solid fa-money-bill"></i>
        <div>
          <h3>Nguyễn Đình Hoàn</h3>
          <span>100870542128 Viettinbank</span>
        </div>
      </div>
    </div>
  );
}

export default Payment;
