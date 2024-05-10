import "./style.css";

interface Props {
    setPage: (page: string) => void;
}

function Nav(props: Props) {
    return (
        <nav>
            <a onClick={() => props.setPage("Hem")}>Hem</a>
            {JSON.parse(localStorage.getItem("user") as string) != null ? <a onClick={() => props.setPage("Tidsrapportering")}>Tidsrapportering</a> : null}
            {JSON.parse(localStorage.getItem("user") as string) != null && JSON.parse(localStorage.getItem("user") as string).username == "admin" ? (
                <a onClick={() => props.setPage("Medlemmar")}>Medlemmar</a>
            ) : null}
            {JSON.parse(localStorage.getItem("user") as string) == null ? (
                <a onClick={() => props.setPage("Logga in")}>{"Logga in"}</a>
            ) : (
                <a
                    onClick={() => {
                        alert(`Användaren "${JSON.parse(localStorage.getItem("user") as string).username}" är nu utloggad!`);
                        localStorage.removeItem("user");
                        props.setPage("Logga in");
                    }}
                >
                    {"Logga ut"}
                </a>
            )}
            {JSON.parse(localStorage.getItem("user") as string) != null ? null : <a onClick={() => props.setPage("Bli medlem")}>Bli medlem</a>}
        </nav>
    );
}

export default Nav;
