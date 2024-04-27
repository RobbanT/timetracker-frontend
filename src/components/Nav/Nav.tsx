import "./style.css";

interface Props {
    setPage: (page: string) => void;
}

function Nav(props: Props) {
    return (
        <nav>
            <a onClick={() => props.setPage("Hem")}>Hem</a>
            <a onClick={() => props.setPage("Tidsuppföljning")}>Tidsuppföljning</a>
            <a onClick={() => props.setPage("Funktioner")}>Funktioner</a>
            <a onClick={() => props.setPage("Om")}>Om</a>
        </nav>
    );
}

export default Nav;
