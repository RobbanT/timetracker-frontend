import "./style.css";
import logo from "../../assets/icon.svg";

function Header() {
    return (
        <header>
            <h1>
                Time <img src={logo} /> Tracker
            </h1>
        </header>
    );
}

export default Header;
