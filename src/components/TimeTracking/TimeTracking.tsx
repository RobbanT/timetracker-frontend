import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";

interface Task {
    title: string;
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
        startTime: "",
        endTime: "",
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTask((values) => ({ ...values, [event.target.name]: event.target.value }));

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const tasks: Task[] = loadUser().tasks;
        tasks.push(task);
        console.log(tasks);
        console.log(loadUser().tasks);
        fetch("https://backend-eft68.ondigitalocean.app/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: loadUser().username,
                password: loadUser().password,
                tasks: [],
            }),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Uppgiften är tillagd!");
            })
            .catch(() => alert(`En uppgift med titel "${task.title}" existerar redan. Försök igen!`));
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Ny uppgift</h3>
                <label>Titel</label>
                <input placeholder="Ange titel..." value={task.title} name="title" onChange={handleChange} required></input>
                <label>Starttid</label>
                <input type="datetime-local" placeholder="Ange starttid..." value={task.startTime} name="startTime" onChange={handleChange} required></input>
                <label>Sluttid</label>
                <input type="datetime-local" placeholder="Ange sluttid..." value={task.endTime} name="endTime" onChange={handleChange} required></input>
                <button type="submit">Lägg till uppgift</button>
            </form>
            <ul>
                <h3>Uppgifter</h3>
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
            <ul>
                <h3>Avslutade Uppgifter</h3>
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
        </>
    );
}

export default TimeTracking;

/*
 */
