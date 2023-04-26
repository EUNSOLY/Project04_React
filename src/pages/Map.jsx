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
    <section className="Map mw">
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
    </section>
  );
}

export default Map;
