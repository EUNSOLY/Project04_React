function ModalList() {
  return (
    <>
      <li>
        <p className="title">
          <span>#</span>&nbsp;엘레베이터
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/img/toiletImg_21.jpg`}
          alt="화장실"
        />
      </li>
    </>
  );
}

export default ModalList;
