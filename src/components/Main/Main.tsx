import "./style.css";
import Home from "../Home/";
import TimeTracking from "../TimeTracking/";
import Members from "../Members/";
import Login from "../Login/";
import SignUp from "../SignUp/";
import { useState } from "react";

interface Props {
    setPage: (page: string) => void;
    page: string;
}

export interface Task {
    title: string;
    startTime: string;
    endTime: string;
}

export interface User {
    username: string;
    password: string;
    tasks: Task[];
}

function Main(props: Props) {
    const [render, rerender] = useState(false);
    return (
        <main>
            <div className="container">
                <h2>{props.page}</h2>
                {{
                    Hem: <Home />,
                    Tidsrapportering: <TimeTracking render={render} rerender={rerender} />,
                    Medlemmar: <Members />,
                    "Logga in": <Login setPage={props.setPage} />,
                    "Bli medlem": <SignUp setPage={props.setPage} />,
                }[props.page] || <Home />}
            </div>
        </main>
    );
}

export default Main;
