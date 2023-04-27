import ModalList from "./ModalList";
function Detail({ modal, setModal, item, i }) {
  return (
    <section className="Detail">
      <div className="modalCon">
        <h2>{item.title}</h2>
        <p></p>
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
          <ModalList item={item} />
        </ul>
      </div>
    </section>
  );
}

export default Detail;
