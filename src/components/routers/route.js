import Layout from "../../layout/defaultLayout/Layout";
import Register from "../authPage/register/Register";
import Login from "../authPage/login/Login";

import Home from "../home/Home";
import MovieDetails from "../movieDetail/MovieDetails";
import WatchMovie from "../watchMovie/WatchMovie";
import MovieManager from "../../admin/addMovie/MovieManager";
import LayoutAdmin from "../../layout/privateLayout/LayoutAdmin";
import AddMovie from "../../admin/addMovie/AddMovie";
import FilterMovie from "../filterMovie/FilterMovie";
import Profile from "../../user/profile/Profile";
import NewType from "../../admin/type/NewType";
import AddType from "../../admin/type/AddType";
import AddMovieSeason from "../../admin/addMovie/AddMovieSeason";
import AddVideo from "../../admin/addVideo/AddVideo";
import AddSeason from "../../admin/addMovie/AddSeason";
import TypeMovies from "../movieList/TypeMovies";
import FreeStyle from "../freestyle/FreeStyle";
import Search from "../search/Search";

export const publicRoute = [
  {
    path: "/",
    element: Home,
    layout: Layout,
  },
  {
    path: "/movie/:slug",
    element: MovieDetails,
    layout: Layout,
  },
  {
    path: "/watch/:slug",
    element: WatchMovie,
    layout: Layout,
  },
  {
    path: "/auth/login",
    element: Login,
    layout: Layout,
  },
  {
    path: "/auth/register",
    element: Register,
    layout: Layout,
  },
  {
    path: "/tim-kiem",
    element: FilterMovie,
    layout: Layout,
  },
  {
    path: "/type/:slug",
    element: TypeMovies,
    layout: Layout,
  },
  {
    path: "/free",
    element: FreeStyle,
    layout: Layout,
  },
  {
    path: "/search",
    element: Search,
    layout: Layout,
  },
];
export const privateRouter = [
  {
    path: "/admin/movie_manager",
    element: MovieManager,
    layout: LayoutAdmin,
  },
  {
    path: "/admin/add_movie",
    element: AddMovie,
    layout: LayoutAdmin,
  },
  {
    path: "/admin/new_type",
    element: NewType,
    layout: LayoutAdmin,
  },
  {
    path: "/admin/add_type",
    element: AddType,
    layout: LayoutAdmin,
  },
  {
    path: "/admin/add_movie_season",
    element: AddMovieSeason,
    layout: LayoutAdmin,
  },
  {
    path: "/admin/add_video/:slug",
    element: AddVideo,
    layout: LayoutAdmin,
  },
  {
    path: "/admin/add_season/:slug",
    element: AddSeason,
    layout: LayoutAdmin,
  },
];
export const userRouter = [
  {
    path: "/auth/profile/:slug",
    element: Profile,
    layout: Layout,
  },
];
