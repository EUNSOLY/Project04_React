import Detail from "./Detail";
function Card({ modal, setModal }) {
  return (
    <li>
      <div className="imgCon">
        <img src={`${process.env.PUBLIC_URL}/img/BD_1.jpg`} alt="빌딩" />
      </div>
      <div className="textCon">
        <p className="title">제은빌딩</p>
        <p className="address">
          주소 :&nbsp;&nbsp; <span>대전광역시 서구 대덕대로 119</span>
        </p>
        <p className="hours">
          영업시간 :&nbsp;&nbsp; <span>09:00~20:00</span>
        </p>
        <div className="hash">
          <p>
            <span>#</span>엘레베이터
          </p>

          <p>
            <span>#</span>점자
          </p>
          <p>
            <span>#</span>자동문
          </p>
          <p>
            <span>#</span>경사로
          </p>
          <p>
            <span>#</span>장애인화장실
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          setModal(true);
        }}
      ></button>
      {modal === true ? <Detail modal={modal} setModal={setModal} /> : null}
    </li>
  );
}

export default Card;
