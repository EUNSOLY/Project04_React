import ModalList from "./ModalList";
function Detail({ modal, setModal, item }) {
  console.log(item);
  return (
    <section className="Detail">
      <div className="modalCon">
        <h2>제은빌딩</h2>
        <div
          className="btn"
          onClick={() => {
            console.log("모달닫힘클릭");
            setModal(!modal);
          }}
        >
          <span></span>
          <span></span>
        </div>
        <ul className="contents">
          <ModalList />
        </ul>
      </div>
    </section>
  );
}

export default Detail;
