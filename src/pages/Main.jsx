import Map from "./Map";
import Card from "./Card";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { kakao } = window;
function Main({ modal, setModal }) {
  let [count, setCount] = useState(3);
  let [dataList, setDataList] = useState([]);

  let [x, setX] = useState(Number);
  let [y, setY] = useState(Number);

  let data = useSelector((state) => state.data);
  useEffect(() => {
    const doSomething = (x, y) => {
      setX(x);
      setY(y);
    };

    navigator.geolocation.getCurrentPosition((position) => {
      doSomething(position.coords.latitude, position.coords.longitude);
    });

    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(x, y), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 마커 생성
    // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
    let markers = [];

    // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
    for (var i = 0; i < data.length; i++) {
      addMarker(
        new kakao.maps.LatLng(data[i].addX, data[i].addY),
        data[i].title
      );
    }
    // 마커를 생성하고 지도위에 표시하는 함수입니다
    function addMarker(position, title) {
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        position: position,
        title: title,
      });
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
      // 생성된 마커를 배열에 추가합니다
      markers.push(marker);

      // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
      let iwContent = title;
      // 인포윈도우를 생성합니다
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });
      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        infowindow.close();
      });
    }
  }, [x]);
  return (
    <>
      <section className="MainBanner ">
        <div className="inner mw">
          <div className="left">
            <div className="textCon">
              <h2>
                내가 가고자하는 <span>주소만</span> 검색하면
              </h2>

              <p>근처 장애인편의시설이 한번에? </p>

              <label>
                <input
                  type="text"
                  placeholder="예 ) 대전광역시 서구 대덕대로 119"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/img/dod.svg`}
                  alt="돋보기"
                />
              </label>
              <Link to="/write">편의시설 등록하기</Link>
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
      <section className="Main">
        {/* map */}
        <div className="Map mw">
          <div id="map" style={{ width: "100%", height: "300px" }}></div>
        </div>
        <ul className="cardCon mw">
          {data.map((item, i) => {
            return (
              <Card key={i} modal={modal} setModal={setModal} item={item} />
            );
          })}
        </ul>
        <div className="btnCon">
          <button>더보기</button>
        </div>
      </section>
    </>
  );
}

export default Main;
