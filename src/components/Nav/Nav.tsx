import "./style.css";

interface Props {
    setPage: (page: string) => void;
}

interface Task {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
}

interface User {
    username: string;
    password: string;
    tasks: Task[];
}

function loadUser(): User {
    return JSON.parse(localStorage.getItem("user") as string);
}

function Nav(props: Props) {
    return (
        <nav>
            <a onClick={() => props.setPage("Hem")}>Hem</a>
            {loadUser() != null ? <a onClick={() => props.setPage("Tidsrapportering")}>Tidsrapportering</a> : null}
            {loadUser() != null && loadUser().username == "admin" ? <a onClick={() => props.setPage("Medlemmar")}>Medlemmar</a> : null}
            <a onClick={() => props.setPage("Logga in")}>{loadUser() == null ? "Logga in" : "Logga ut"}</a>
            {loadUser() != null ? null : <a onClick={() => props.setPage("Bli medlem")}>Bli medlem</a>}
        </nav>
    );
}

export default Nav;
