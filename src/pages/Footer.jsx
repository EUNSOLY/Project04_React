function Footer() {
  return (
    <footer className="Footer">
      <div className="inner mw">
        <div className="imgCon">
          <img src={`${process.env.PUBLIC_URL}/img/logoW.svg`} alt="logo" />
        </div>
        <p></p>
        <p>2023 @copy EUNSOLY</p>
      </div>
    </footer>
  );
}

export default Footer;
