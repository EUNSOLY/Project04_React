import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Write({ urlName }) {
  let [input, setInput] = useState("");
  let [input2, setInput2] = useState("");
  let [input3, setInput3] = useState("");
  let [input4, setInput4] = useState("");
  let [input5, setInput5] = useState("");
  let dispatch = useDispatch();

  let { inputVlaue1, inputVlaue2, inputVlaue3, inputVlaue4, inputVlaue5 } =
    useRef(null);
  const handleClick = () => {
    let inputValue = inputVlaue1.current.value;
    let inputValue2 = inputVlaue2.current.value;
    let inputValue3 = inputVlaue3.current.value;
    let inputValue4 = inputVlaue4.current.value;
    let inputValue5 = inputVlaue5.current.value;
    setInput(inputValue);
  };

  return (
    <>
      <section className="MainBanner ">
        <div className="inner mw">
          <div className="left">
            <div className="textCon">
              <h2>나만 알고있는 장애인편의시설</h2>
              <p>모두에게 알려주세요!</p>
            </div>
          </div>
          <div className="imgCon">
            <img
              src={`${process.env.PUBLIC_URL}/img/People.svg`}
              alt="돋보기"
              className="img1"
            />
            <img
              src={`${process.env.PUBLIC_URL}/img/Peoples.svg`}
              alt="돋보기"
              className="img2"
            />
          </div>
        </div>
      </section>

      <section className="Write mw">
        <h2>장애인 편의시설 입력하기</h2>
        <form action="" className="inputCon">
          <label htmlFor="adress" className="adress">
            <span>도로명주소</span>
          </label>
          <input type="text" id="adress" ref={inputVlaue1} />

          <label htmlFor="BD" className="BD">
            <span>빌딩명</span>
          </label>
          <label htmlFor="house" className="house">
            <span>영업시간</span>
          </label>
          <input type="text" id="BD" ref={inputVlaue2} />
          <input type="text" id="house" ref={inputVlaue3} />

          <div className="">
            <span>장애인 편의시설 선택</span>
          </div>
          <ul className="checkCon">
            <li>
              <label htmlFor="ele">엘레베이터</label>
              <input type="checkbox" id="ele" />
              <input type="file" />
            </li>
            <li>
              <label htmlFor="toil">장애인화장실</label>
              <input type="checkbox" id="toil" />
              <input type="file" />
            </li>
            <li>
              <label htmlFor="slop">경사로</label>
              <input type="checkbox" id="slop" />
              <input type="file" />
            </li>
            <li>
              <label htmlFor="braille">점자</label>
              <input type="checkbox" id="braille" />
              <input type="file" />
            </li>
            <li>
              <label htmlFor="auto">자동문</label>
              <input type="checkbox" id="auto" />
              <input type="file" />
            </li>
          </ul>

          <div className="btns">
            <button onClick={handleClick}>저장</button>
            <Link to="/">홈으로</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Write;
