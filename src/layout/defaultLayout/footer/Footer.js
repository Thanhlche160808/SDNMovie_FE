import React from "react";
import "./style.scss";
function Footer() {
  return (
    <footer className="footer container">
      <div className="footer_content">
        <div className="footer_content_logo">
          <img src="https://res.cloudinary.com/db7xtr0t6/image/upload/v1677930694/Anime_Project/Logo_kkus6y.png" />
          <h3 style={{ fontSize: "14px", color: "#fff", marginTop: "10px" }}>
            @Dinh Hoan
          </h3>
        </div>
        <div className="footer_content_link">
          <ul className="footer_content_link_list">
            <li>
              <a href="https://www.facebook.com/profile.php?id=100015481175598">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/hoan9067/?next=%2F">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
