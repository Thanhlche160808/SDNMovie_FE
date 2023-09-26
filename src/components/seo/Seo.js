import React from "react";
import { Helmet } from "react-helmet";

function Seo({ title, description, img, url, keyword }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="animene.site" />
      <meta property="og:url" content={`https://animene.site${url}`} />
      <meta property="og:locale" content="vi_VN" />
    </Helmet>
  );
}

export default Seo;
