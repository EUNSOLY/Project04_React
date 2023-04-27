function ModalList({ item }) {
  console.log(item.elevatorImg);
  return (
    <>
      {item.elevator === 1 ? (
        <li>
          <p className="title">
            <span>#</span>&nbsp;엘레베이터
          </p>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}${item.elevatorImg}.jpg`}
              alt="엘레베이터"
            />
          </div>
        </li>
      ) : null}
      {item.toilet === 1 ? (
        <li>
          <p className="title">
            <span>#</span>&nbsp;장애인화장실
          </p>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}${item.toiletImg}.jpg`}
              alt="장애인화장실"
            />
          </div>
        </li>
      ) : null}
      {item.slope === 1 ? (
        <li>
          <p className="title">
            <span>#</span>&nbsp;경사로
          </p>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}${item.slopeImg}.jpg`}
              alt="경사로"
            />
          </div>
        </li>
      ) : null}
      {item.braille === 1 ? (
        <li>
          <p className="title">
            <span>#</span>&nbsp;점자
          </p>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}${item.brailleImg}.jpg`}
              alt="점자"
            />
          </div>
        </li>
      ) : null}
      {item.automaticDoor === 1 ? (
        <li>
          <p className="title">
            <span>#</span>&nbsp;자동문
          </p>
          <div>
            <img
              src={`${process.env.PUBLIC_URL}${item.automaticDoorImg}.jpg`}
              alt="자동문"
            />
          </div>
        </li>
      ) : null}
    </>
  );
}

export default ModalList;
