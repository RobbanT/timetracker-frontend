import { ChangeEvent, FormEvent, useState } from "react";
import logo from "../../assets/icon2.svg";
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
    function getTotalTime(task: Task): string {
        let totalTime: number = 0;
        totalTime += new Date(task.endTime).getTime() - new Date(task.startTime).getTime();
        const hours = Math.floor(totalTime / 60 / 60 / 1000);
        totalTime -= hours * 1000 * 60 * 60;
        const minutes = Math.floor(totalTime / 1000 / 60);
        return `${hours}h:${minutes}min`;
    }

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

    const handleUpdate = (event: FormEvent) => {
        event.preventDefault();
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
                {loadUser().tasks.length != 0 ? (
                    loadUser().tasks.map((task: Task) => {
                        return task.startTime == null || task.endTime != null ? (
                            <li key={task.title}>
                                <form onSubmit={handleUpdate}>
                                    <p>{task.title}</p>
                                    <img src={logo} />
                                    <p>{getTotalTime(task)}</p>
                                    <button type="submit">{task.startTime == null ? "Påbörja" : "Avsluta"}</button>
                                </form>
                                <button>Ta bort</button>
                            </li>
                        ) : null;
                    })
                ) : (
                    <p>Inga uppgifter existerar.</p>
                )}
            </ul>
            <ul>
                <h3>Avslutade uppgifter</h3>
                {loadUser().tasks.length != 0 ? (
                    loadUser().tasks.map((task: Task) => {
                        return task.startTime != null && task.endTime != null ? (
                            <li key={task.title}>
                                <p>{task.title}</p>
                                <img src={logo} />
                                <p>{getTotalTime(task)}</p>
                            </li>
                        ) : null;
                    })
                ) : (
                    <p>Inga avslutade uppgifter existerar.</p>
                )}
            </ul>
        </>
    );
}

export default TimeTracking;

/*
 */
