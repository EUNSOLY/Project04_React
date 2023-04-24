import { Link } from "react-router-dom";
function MainBanner() {
  return (
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
              <img src={`${process.env.PUBLIC_URL}/img/dod.svg`} alt="돋보기" />
            </label>
            <Link to="/input">편의시설 등록하기</Link>
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
      </div>
    </section>
  );
}

export default MainBanner;
