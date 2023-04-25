import ModalList from "./ModalList";
function Detail({ modal, setModal }) {
  return (
    <section className="Detail">
      <div className="modalCon">
        <h2>제은빌딩</h2>
        <div
          className="btn"
          onClick={() => {
            setModal(false);
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
