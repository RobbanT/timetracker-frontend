import "./style.css";

interface Props {
    page: string;
}

function Main(props: Props) {
    return (
        <main>
            <div className="container">
                <h2>{props.page}</h2>
                {{
                    home: null,
                    reservation: null,
                    staff: null,
                    about: null,
                }[props.page] || null}
            </div>
        </main>
    );
}

export default Main;
