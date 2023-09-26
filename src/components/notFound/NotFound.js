import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div>
      <h1>404 Error Page </h1>
      <p class="zoom-area">
        <b>CSS NOT FOUND</b>
      </p>
      <section class="error-container">
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
        <span class="zero">
          <span class="screen-reader-text">0</span>
        </span>
        <span class="four">
          <span class="screen-reader-text">4</span>
        </span>
      </section>
      <div class="link-container">
        <Link to={`/`} class="more-link">
          Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
