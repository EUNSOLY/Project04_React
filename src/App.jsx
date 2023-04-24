import { Routes, Route } from "react-router-dom";

import "./css/my_reset.css";
import "./css/App.css";

import Header from "./pages/Header";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/*" element={<div>페이지가 없습니다.</div>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
