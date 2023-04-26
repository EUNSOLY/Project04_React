import Map from "./Map";
import Card from "./Card";
import { useSelector } from "react-redux";
function Main({ modal, setModal }) {
  let data = useSelector((state) => state.data);

  return (
    <section className="Main">
      <Map />
      <ul className="cardCon mw">
        {data.map((item, i) => {
          return <Card key={i} modal={modal} setModal={setModal} item={item} />;
        })}
      </ul>
      <div className="btnCon">
        <button>더보기</button>
      </div>
    </section>
  );
}

export default Main;
