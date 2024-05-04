import Calendar from "react-calendar";
import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

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

function TimeTracking() {
    const [task, setTask] = useState<Task>({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
    });
    const [value, onChange] = useState<Value>(new Date());
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTask((values) => ({ ...values, [event.target.name]: event.target.value }));

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };
    return (
        <>
            <Calendar onChange={onChange} showNeighboringMonth={false} prev2Label={null} next2Label={null} minDate={new Date()} maxDate={new Date(2025, 0, 0)} minDetail={"month"} value={value} />
            <form onSubmit={handleSubmit}>
                <h3>Ny uppgift</h3>
                <label>Användarnamn</label>
                <input placeholder="Ange titel..." value={task.title} name="username" onChange={handleChange} minLength={5} maxLength={64} required></input>
                <label>Starttid</label>
                <input type="datetime-local" placeholder="Ange starttid..." value={task.title} name="username" onChange={handleChange} minLength={5} maxLength={64} required></input>
                <label>Sluttid</label>
                <input type="datetime-local" placeholder="Ange sluttid..." value={task.title} name="username" onChange={handleChange} minLength={5} maxLength={64} required></input>
                <button type="submit">Lägg till uppgift</button>
            </form>
            <div className="inner-container">
                <h3>Uppgifter</h3>
                <ul>
                    {loadUser().tasks.map((task: Task) => (
                        <li>
                            <p>
                                Titel
                                <br />
                                {task.title}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default TimeTracking;
