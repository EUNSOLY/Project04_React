import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./css/my_reset.css";
import "./css/App.css";

import Header from "./pages/Header";
import Main from "./pages/Main";
import Write from "./pages/Write";

import Footer from "./pages/Footer";
function App() {
  let urlName = useLocation().pathname;
  let [local, setLocal] = useState([]);
  // 로컬스토리지 디테일 페이지

  useEffect(() => {
    if (!localStorage.getItem("detail")) {
      localStorage.setItem("detail", JSON.stringify([]));
    } else {
      let detail = JSON.parse(localStorage.getItem("detail"));
      setLocal(detail);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Main local={local} setLocal={setLocal} />}
        ></Route>
        <Route path="/write" element={<Write urlName={urlName} />}></Route>
        <Route path="/*" element={<div>페이지가 없습니다.</div>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
