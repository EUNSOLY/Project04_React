import Detail from "./Detail";
function Card({ modal, setModal, item }) {
  return (
    <li>
      <div className="imgCon">
        <img src={`${process.env.PUBLIC_URL}${item.Img}`} alt="빌딩" />
      </div>
      <div className="textCon">
        <p className="title">{item.title}</p>
        <p className="address">
          주소 :&nbsp;&nbsp; <span>{item.address}</span>
        </p>
        <p className="hours">
          영업시간 :&nbsp;&nbsp; <span>{item.hours}</span>
        </p>
        <div className="hash">
          {item.elevator === 1 ? (
            <p>
              <span>#</span>엘레베이터
            </p>
          ) : null}

          {item.braille === 1 ? (
            <p>
              <span>#</span>점자
            </p>
          ) : null}

          {item.slope === 1 ? (
            <p>
              <span>#</span>경사로
            </p>
          ) : null}
          {item.automaticDoor === 1 ? (
            <p>
              <span>#</span>자동문
            </p>
          ) : null}
          {item.toilet === 1 ? (
            <p>
              <span>#</span>장애인화장실
            </p>
          ) : null}
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
