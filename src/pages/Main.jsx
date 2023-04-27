import Card from "./Card";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const { kakao } = window;

function Main({ local, setLocal }) {
  // Redux 데이터
  let data = useSelector((state) => state.data);
  // 지도 useState
  let [x, setX] = useState(Number);
  let [y, setY] = useState(Number);

  // input 영역
  let [input, setInput] = useState("");
  let [add, setAdd] = useState("");
  let inputRef = useRef(null); // input 참조

  // input 값을 다시 저장해서 전송
  const inputValue = () => {
    let value = inputRef.current.value;
    setInput(value);
    input === null
      ? setInput([""])
      : setInput([inputRef.current.value, ...input]);
    setAdd((add = input));
    inputRef.current.value = ""; // input 초기화
    console.log(input);
  };
  if (typeof add === "object") {
    // console.log("object");
    add = add[0];
    // console.log("add obj", add);
  } else if (typeof add === "string") {
    // console.log("string이다");
  }

  // filter useState
  let [filterData, setFilterData] = useState([]);

  // 카카오맵 useEffect
  useEffect(() => {
    setTimeout(() => {
      if (add === "") {
        console.log("add가 비어있습니다");
        navigator.geolocation.getCurrentPosition((position) => {
          doSomething(position.coords.latitude, position.coords.longitude);
        });
      } else {
        console.log("add가 비어있을 때 else");
        let geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(add, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            console.log(result[0].y, result[0].x);
            doSomething(result[0].y, result[0].x);
          }
        });
      }
    }, 50);
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

    // 확대 축소 막기
    function setZoomable(zoomable) {
      map.setZoomable(zoomable);
    }
    setZoomable(false);

    // 보이는 화면 내에 있는 마커 데이터 출력

    let markers = []; // 지도에 표시된 마커 객체를 가지고 있을 배열입니다

    // 데이터에 있는 배열들을 반복하면서 좌표값을 지도에 뿌려주기
    function showTextMarkers() {
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
    }

    showTextMarkers();
    // 보이는 화면에 맞는 데이터 출력
    kakao.maps.event.addListener(
      map,
      "tilesloaded",
      function () {
        let bounds = map.getBounds();
        const visibleMarkers = [];
        let latlng = map.getCenter();

        for (let i = 0; i < markers.length; i++) {
          if (bounds.contain(markers[i].getPosition())) {
            visibleMarkers.push(markers[i]);
          }
        }
        const filteredData = visibleMarkers.reduce(
          (acc, marker) => {
            const position = marker.getTitle();
            const filtered = data.filter((a) => a.title === position);

            return [...acc, ...filtered];
          },
          [latlng]
        );
        setFilterData(filteredData);
      },
      [add]
    );
  }, [add, x, y]);

  // console.log("filterData", filterData);
  console.log(!filterData);
  let datas = [];
  let [btnData, setBtnData] = useState([]);
  let [listData, setListData] = useState([]);
  let [listCount, setListCount] = useState(3);
  useEffect(() => {
    if (!filterData) {
      return;
    } else {
      datas = filterData.slice(1);
      setBtnData([...datas]);
      setListData([...datas]);
      console.log("datas", datas);
    }
  }, [filterData]);

  // 버튼 강제 클릭으로 리스트 바로 출력시키기 ( 대신 검색했을 경우에만 가능하도록 검색 버튼 이용)
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);

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
                  ref={inputRef}
                  onChange={(e) => {
                    // setInputData(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  onClick={() => {
                    inputValue();
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
          {btnData.map((item, i) => {
            return <Card key={i} item={item} i={i} />;
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
