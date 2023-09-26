import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Rating from "../rating/Rating";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import { UserStore } from "../../App";
import { toast } from "react-toastify";
import Comments from "../comments/Comments";
import LoadingSmall from "../loadingSmall/LoadingSmall";
import Seo from "../seo/Seo";
const RatingList = lazy(() => import("../rating/RatingList"));
function MovieDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = useLocation();
  const [detail, setDetail] = useState(null);
  const { slug } = useParams();
  const { cache, socket } = useContext(UserStore);
  const [isRate, setIsRate] = useState(true);
  const [isComment, setIsComment] = useState(false);
  const [length, setLength] = useState(0);
  const [update, setUpdate] = useState(false);
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [slug]);
  useEffect(() => {
    let here = true;
    const url = `/api/movie_season/detail/${slug}`;
    if (cache.current[url]) {
      return setDetail(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setDetail(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, [slug]);

  useEffect(() => {
    const url = `/api/movie_season/detail/${slug}`;
    if (cache.current[url]) {
      return;
    } else {
      axios
        .post("/api/movie_season/view", {
          slug: slug,
        })
        .catch((err) => toast.error(err));
    }
  }, []);
  const handleMark = async () => {
    if (!auth?.user) {
      return toast.error("Đăng nhập để lưu phim !");
    }
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/user/mark", {
        movieID: detail?._id,
        _id: auth?.user?._id,
      });
      dispatch(isSuccess());
      return toast.success(res.data);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error);
    }
  };
  useEffect(() => {
    if (detail?._id) {
      socket.emit("join", { movieID: detail?._id });
    }
  }, [detail]);
  return (
    <div className="movie_detail">
      {detail && (
        <Seo
          title={`Phim ${detail?.name}`}
          img={detail?.image}
          url={url?.pathname}
          description={detail?.content}
          keyword={`phim ${detail?.name}, ${detail?.name} vietsub, phim ${detail?.name} moi nhat`}
        />
      )}
      <div
        className="movie_detail_background"
        style={{
          background: `url(${detail?.image}) center top / cover no-repeat`,
        }}
      ></div>
      <div className="container movie_detail_content">
        <div
          className="movie_detail_content_item"
          onClick={() =>
            navigate(`/watch/${detail?.video[detail?.video.length - 1]?.slug}`)
          }
        >
          <i className="fa-regular fa-circle-play"></i>
          <span>Xem tập mới nhất</span>
        </div>
        <div
          className="movie_detail_content_item"
          onClick={() => navigate(`/watch/${detail?.video[0]?.slug}`)}
        >
          <i className="fa-solid fa-circle-play"></i>
          <span>Xem từ đầu</span>
        </div>
        <div className="movie_detail_content_title">
          <h3>{detail?.name}</h3>
        </div>
        <div className="movie_detail_content_details">
          <div className="movie_detail_content_details_item">
            <i className="fa-regular fa-star"></i>
            <span>{detail?.totalRate}</span>
          </div>
          <div className="movie_detail_content_details_item">
            <span>{detail?.typeMovie?.[0]?._id?.typeName}</span>
          </div>
          <div className="movie_detail_content_details_item">
            <span>{detail?.view} Lượt xem</span>
          </div>
          <div className="movie_detail_content_details_item">
            <span>
              {detail?.totalChap === detail?.video?.length
                ? "Hoàn tất"
                : "Đang tiến hành"}
            </span>
          </div>
        </div>
        <div className="movie_detail_content_chap">
          <div className="movie_detail_content_chap_wrap">
            {detail?.video?.map((item, index) => {
              return (
                <div
                  className="movie_detail_content_chap_wrap_item"
                  key={index + "video"}
                  onClick={() => navigate(`/watch/${item?.slug}`)}
                >
                  {detail?.video?.length === 1 ? "Full" : index + 1}
                </div>
              );
            })}
          </div>
        </div>
        <div className="movie_detail_content_demo">
          <div className="movie_detail_content_demo_header">
            <i className="fa-solid fa-bars"></i>
            <span>Mùa</span>
          </div>
          <div className="movie_detail_content_demo_ss">
            {detail?.movieID?.movieSeason?.map((item, index) => {
              return (
                <div
                  key={index + "season"}
                  onClick={() => navigate(`/movie/${item?.slug}`)}
                >
                  {item?.seasonName}
                </div>
              );
            })}
          </div>
        </div>
        <div className="movie_detail_content_demo">
          <div className="movie_detail_content_demo_header">
            <i className="fa-sharp fa-solid fa-circle-info"></i>
            <span>Giới thiệu</span>
          </div>
          <div className="movie_detail_content_demo_content">
            {detail?.content}
          </div>
        </div>
        <div className="type_movie">
          <div className="type_movie_content">
            <h3>Thể loại</h3>
            <div>
              {detail?.typeMovie?.map((item, index) => {
                return (
                  <span
                    key={index + "typeName"}
                    onClick={() => navigate(`/type/${item?._id?.slug}`)}
                  >
                    {item?._id?.typeName}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="type_movie_share">
            <h3>Chia sẻ</h3>
            <div className="type_movie_share_link">
              <i className="fa-brands fa-facebook-f"></i>
              Share
            </div>
          </div>
          <div className="type_movie_share">
            <h3>Bộ sưu tập</h3>
            <div className="type_movie_share_link" onClick={handleMark}>
              <i className="fa-solid fa-bookmark"></i>
              Lưu
            </div>
          </div>
        </div>
        <div className="rate_and_comment">
          <div
            className={
              isRate ? "rate_and_comment_item active" : "rate_and_comment_item"
            }
            onClick={() => {
              setIsRate(true);
              return setIsComment(false);
            }}
          >
            <h4>Đánh giá </h4>
            <span>{length}</span>
          </div>
          <div
            className={
              isComment
                ? "rate_and_comment_item active"
                : "rate_and_comment_item"
            }
            onClick={() => {
              setIsRate(false);
              return setIsComment(true);
            }}
          >
            <h4>Bình luận</h4>
          </div>
        </div>
        {isRate && (
          <Rating detail={detail} setUpdate={setUpdate} update={update} />
        )}
        <Suspense fallback={<LoadingSmall />}>
          {isRate && (
            <RatingList
              type={isRate ? "rate" : "comment"}
              setLength={setLength}
              update={update}
            />
          )}
        </Suspense>
        {isComment && (
          <div className="comment_wrap">
            <Comments detail={detail} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
