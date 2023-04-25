import Map from "./Map";
import Card from "./Card";

function Main({ modal, setModal }) {
  return (
    <section className="Main">
      <Map />
      <ul className="cardCon mw">
        <Card modal={modal} setModal={setModal} />
      </ul>
      <div className="btnCon">
        <button>더보기</button>
      </div>
    </section>
  );
}

export default Main;
