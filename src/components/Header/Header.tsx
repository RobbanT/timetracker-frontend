import "./style.css";
import logo from "../../assets/icon.svg";

function Header() {
    return (
        <header>
            <img src={logo} />
            <h1>Time Tracker</h1>
        </header>
    );
}

export default Header;
