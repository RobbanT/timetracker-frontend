import { Member } from "../Main";
import "./style.css";

interface Props {
    setPage: (page: string) => void;
}

function loadMember(): Member {
    return JSON.parse(localStorage.getItem("user") as string);
}

function removeMember(): void {
    return localStorage.removeItem("user");
}

function Nav(props: Props) {
    return (
        <nav>
            <a onClick={() => props.setPage("Hem")}>Hem</a>
            {loadMember() != null ? <a onClick={() => props.setPage("Tidsrapportering")}>Tidsrapportering</a> : null}
            {loadMember() != null && loadMember().username == "admin" ? <a onClick={() => props.setPage("Medlemmar")}>Medlemmar</a> : null}
            {loadMember() == null ? (
                <a onClick={() => props.setPage("Logga in")}>{"Logga in"}</a>
            ) : (
                <a
                    onClick={() => {
                        props.setPage("Logga in");
                        removeMember();
                    }}
                >
                    {"Logga ut"}
                </a>
            )}
            {loadMember() != null ? null : <a onClick={() => props.setPage("Bli medlem")}>Bli medlem</a>}
        </nav>
    );
}

export default Nav;
