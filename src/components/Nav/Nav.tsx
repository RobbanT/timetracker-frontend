import "./style.css";

interface Props {
    setPage: (page: string) => void;
}

function Nav(props: Props) {
    return (
        <nav>
            <a onClick={() => props.setPage("Hem")}>Hem</a>
            <a onClick={() => props.setPage("Tidsrapportering")}>Tidsrapportering</a>
            <a onClick={() => props.setPage("Medlemmar")}>Medlemmar</a>
            <a onClick={() => props.setPage(localStorage.getItem("cart") != null ? "Logga in" : "Logga ut")}>Logga in</a>
            <a onClick={() => props.setPage("Bli medlem")}>Bli medlem</a>
        </nav>
    );
}

export default Nav;
