import "./style.css";
import Home from "../Home/";
import TimeTracking from "../TimeTracking/";
import Members from "../Members/";
import Login from "../Login/";
import SignUp from "../SignUp/";

interface Props {
    page: string;
}

export interface Task {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
}

export interface Member {
    username: string;
    password: string;
    tasks: Task[];
}

function Main(props: Props) {
    return (
        <main>
            <div className="container">
                <h2>{props.page}</h2>
                {{
                    Hem: <Home />,
                    Tidsrapportering: <TimeTracking />,
                    Medlemmar: <Members />,
                    "Logga in": <Login />,
                    "Bli medlem": <SignUp />,
                }[props.page] || <Home />}
            </div>
        </main>
    );
}

export default Main;
