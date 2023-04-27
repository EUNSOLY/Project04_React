import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const { kakao } = window;

function Map() {
  let [x, setX] = useState(Number);
  let [y, setY] = useState(Number);

  let data = useSelector((state) => state.data);

  useEffect(() => {
    const doSomething = (x, y) => {
      setX(x);
      setY(y);
    };

    // input 영역
    const inputCon = document.querySelector(".");
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
  }, [x]);

  return (
    <section className="Map mw">
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
    </section>
  );
}

export default Map;
