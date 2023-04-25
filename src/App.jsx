import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import "./css/my_reset.css";
import "./css/App.css";

import Header from "./pages/Header";
import Main from "./pages/Main";
import Write from "./pages/Write";
import MainBanner from "./pages/MainBanner";
import Footer from "./pages/Footer";
function App() {
  let [modal, setModal] = useState(false);
  let urlName = useLocation().pathname;

  return (
    <div className="App">
      <Header />
      <MainBanner urlName={urlName} />
      <Routes>
        <Route
          path="/"
          element={<Main modal={modal} setModal={setModal} />}
        ></Route>
        <Route path="/write" element={<Write urlName={urlName} />}></Route>
        <Route path="/*" element={<div>페이지가 없습니다.</div>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
