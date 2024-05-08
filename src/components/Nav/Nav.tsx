import { loadUser } from "../Main";
import "./style.css";

interface Props {
    setPage: (page: string) => void;
}

function Nav(props: Props) {
    return (
        <nav>
            <a onClick={() => props.setPage("Hem")}>Hem</a>
            {loadUser() != null ? <a onClick={() => props.setPage("Tidsrapportering")}>Tidsrapportering</a> : null}
            {loadUser() != null && loadUser().username == "admin" ? <a onClick={() => props.setPage("Medlemmar")}>Medlemmar</a> : null}
            {loadUser() == null ? (
                <a onClick={() => props.setPage("Logga in")}>{"Logga in"}</a>
            ) : (
                <a
                    onClick={() => {
                        alert(`Användaren "${loadUser().username}" är nu utloggad!`);
                        localStorage.removeItem("user");
                        props.setPage("Logga in");
                    }}
                >
                    {"Logga ut"}
                </a>
            )}
            {loadUser() != null ? null : <a onClick={() => props.setPage("Bli medlem")}>Bli medlem</a>}
        </nav>
    );
}

export default Nav;
