import { createContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import {
  privateRouter,
  publicRoute,
  userRouter,
} from "./components/routers/route";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import Loading from "./components/loading/Loading";
import { io } from "socket.io-client";
import NotFound from "./components/notFound/NotFound";
export const UserStore = createContext();
const socket = io("http://localhost:8000/");
function App() {
  const [role, setRole] = useState("ROLE_USER");
  const cacheRef = useRef({});
  const auth = useSelector((state) => state?.auth);
  useEffect(() => {
    if (auth?.user) {
      const decoded = jwtDecode(auth?.user?.token);
      setRole(decoded?.roleName);
    }
  }, [auth?.user?.token]);
  return (
    <BrowserRouter>
      <UserStore.Provider value={{ role, cache: cacheRef, socket }}>
        <div className="App">
          <Routes>
            {publicRoute?.map((item, index) => {
              const Page = item?.element;
              return item?.layout ? (
                <Route
                  path={item?.path}
                  key={index + "route"}
                  element={
                    <item.layout>
                      <Page />
                    </item.layout>
                  }
                />
              ) : (
                <Route
                  path={item?.path}
                  key={index + "route"}
                  element={<Page />}
                />
              );
            })}
            {role === "ROLE_ADMIN" &&
              privateRouter?.map((item, index) => {
                const Page = item?.element;
                return item?.layout ? (
                  <Route
                    path={item?.path}
                    key={index + "route"}
                    element={
                      <item.layout>
                        <Page />
                      </item.layout>
                    }
                  />
                ) : (
                  <Route
                    path={item?.path}
                    key={index + "route"}
                    element={<Page />}
                  />
                );
              })}
            {(role === "ROLE_USER" || role === "ROLE_ADMIN") &&
              userRouter?.map((item, index) => {
                const Page = item?.element;
                return item?.layout ? (
                  <Route
                    path={item?.path}
                    key={index + "route"}
                    element={
                      <item.layout>
                        <Page />
                      </item.layout>
                    }
                  />
                ) : (
                  <Route
                    path={item?.path}
                    key={index + "route"}
                    element={<Page />}
                  />
                );
              })}
            <Route path={"*"} element={<NotFound />} />
          </Routes>
          {auth?.loading && <Loading />}
          <ToastContainer />
        </div>
      </UserStore.Provider>
    </BrowserRouter>
  );
}

export default App;
