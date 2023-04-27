import Card from "./Card";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { kakao } = window;

function Main({ modal, setModal, local, setLocal }) {
  // json데이터 Redux로 가져오기
  let data = useSelector((state) => state.data);
  // 좌표 useState
  let [x, setX] = useState(Number);
  let [y, setY] = useState(Number);
  //  input 데이터
  let [inputData, setInputData] = useState("");

  // 로컬스토리지 저장영역
  // let [local, setLocal] = useState([]);
  // input 영역
  const input = document.querySelector(".inner .left label input");
  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const inputClose = () => {
    // input.value = "";
    setInputData("");
  };

  // 카카오맵 api
  useEffect(() => {
    const doSomething = (x, y) => {
      setX(x);
      setY(y);
    };

    // geolocation으로 구글로컬상의 현재 위치 생성
    navigator.geolocation.getCurrentPosition((position) => {
      doSomething(position.coords.latitude, position.coords.longitude);
    });

    // 카카오맵 생성
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(x, y), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    let markers = []; // 지도에 표시된 마커 객체를 가지고 있을 배열입니다

    // 데이터에 있는 배열들을 반복하면서 좌표값을 지도에 뿌려주기
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

      marker.setMap(map); // 마커가 지도 위에 표시되도록 설정합니다
      markers.push(marker); // 생성된 마커를 배열에 추가합니다

      // 인포윈도우
      let iwContent = title;
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      // 마커에 마우스오버 이벤트 (인포윈도우표시, 닫기)
      kakao.maps.event.addListener(marker, "mouseover", function () {
        infowindow.open(map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
      });
    }
  }, [x.inputData]);

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
                  value={inputData}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  onClick={() => {
                    inputClose();
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/img/dod.svg`}
                    alt="돋보기"
                  />
                </button>
              </label>
              <Link to="/write">편의시설 등록하기</Link>
            </div>
          </div>
          <div className="imgCon">
            <img
              src={`${process.env.PUBLIC_URL}/img/People.svg`}
              alt="사람1"
              className="img1"
            />
            <img
              src={`${process.env.PUBLIC_URL}/img/Peoples.svg`}
              alt="사람2"
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
