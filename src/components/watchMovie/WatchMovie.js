import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
} from "react";
import "./style.scss";
import { UserStore } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/auth/slice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSmall from "../loadingSmall/LoadingSmall";
import Seo from "../seo/Seo";
const SwiperMovie = lazy(() => import("./SwiperMovie"));
const Comments = lazy(() => import("../comments/Comments"));

function WatchMovie() {
  const [movie, setMovie] = useState(null);
  const [chap, setChap] = useState([]);
  const { cache, socket } = useContext(UserStore);
  const dispatch = useDispatch();
  const url = useLocation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const nextChap = useMemo(() => {
    const indexNextChap = chap?.video?.findIndex((item) => item?.slug === slug);
    if (indexNextChap === chap?.video?.length - 1) {
      return null;
    }
    return indexNextChap + 1;
  }, [slug, chap]);
  const backChap = useMemo(() => {
    const indexBackChap = chap?.video?.findIndex((item) => item?.slug === slug);
    if (indexBackChap === 0) {
      return null;
    }
    return indexBackChap - 1;
  }, [slug, chap]);
  useEffect(() => {
    let here = true;
    const url = `/api/movie_video/detail/${slug}`;
    if (cache.current[url]) {
      setMovie(cache.current[url]?.video);
      setChap(cache.current[url]?.movie);
      return;
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setMovie(res?.data?.video);
        setChap(res?.data?.movie);
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
    window.scrollTo({
      top: 180,
      behavior: "smooth",
    });
  }, [slug]);

  useEffect(() => {
    if (chap?._id) {
      socket.emit("join", { movieID: chap?._id });
    }
  }, [chap]);
  return (
    <div className="watch_movie">
      {movie && (
        <Seo
          title={`Đang xem ${movie?.name}`}
          img={movie?.image}
          url={url?.pathname}
          description={movie?.name}
          keyword={`phim ${movie?.name}, ${movie?.name} vietsub, phim ${movie?.name} moi nhat`}
        />
      )}
      <div className="watch_movie_header container">
        <i class="fa-solid fa-film"></i>
        {movie?.name}
      </div>
      <div className="watch_movie_video">
        <iframe
          width="100%"
          height="100%"
          src={movie?.video}
          frameborder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div
        className="container"
        style={{
          marginTop: "20px",
        }}
      >
        <button
          className="btn btn-light"
          style={{
            marginRight: "10px",
          }}
          disabled={backChap === null}
          onClick={() => navigate(`/watch/${chap?.video[backChap]?.slug}`)}
        >
          <i class="fa-solid fa-backward"></i> Tập trước
        </button>
        <button
          className="btn btn-light"
          disabled={nextChap === null}
          onClick={() => navigate(`/watch/${chap?.video[nextChap]?.slug}`)}
        >
          Tập tiếp <i className="fa-solid fa-forward"></i>
        </button>
      </div>
      <div className="watch_movie_chap">
        <div className="watch_movie_chap_header container">
          <i class="fa-solid fa-list"></i>
          <h3>Danh sách tập</h3>
        </div>
        <Suspense fallback={<LoadingSmall />}>
          <SwiperMovie chap={chap} />
        </Suspense>
      </div>
      <div className="watch_movie_comments">
        <Suspense fallback={<LoadingSmall />}>
          {" "}
          <Comments detail={chap} />
        </Suspense>
      </div>
    </div>
  );
}

export default WatchMovie;
