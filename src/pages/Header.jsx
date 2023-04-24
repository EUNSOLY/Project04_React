import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="Header mw">
      <Link to="/">
        <img src={`${process.env.PUBLIC_URL}/img/logo.svg`} alt="logo" />
      </Link>
    </header>
  );
}
export default Header;
