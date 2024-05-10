import { ChangeEvent, FormEvent, useState } from "react";
import type { Task } from "../Main/";
import "./style.css";

function TimeTracking() {
    const [render, rerender] = useState(false);
    const getTotalTime = (task: Task): string => {
        const totalTime: number = new Date(task.endTime).getTime() - new Date(task.startTime).getTime();
        const hours = Math.round(totalTime / 60 / 60 / 1000);
        const minutes = Math.round((totalTime - hours * 1000 * 60 * 60) / 1000 / 60);
        return `${hours}h:${minutes}min`;
    };
    const [task, setTask] = useState<Task>({
        title: "",
        startTime: "",
        endTime: "",
    });
    const [tasks, setTasks] = useState<Task[]>([]);
    fetch(`https://backend-eft68.ondigitalocean.app/user/${JSON.parse(localStorage.getItem("user") as string).username}/tasks`)
        .then((res) => res.json())
        .then((data) => setTasks(data));
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTask((values) => ({ ...values, [event.target.name]: event.target.value }));
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch(`https://backend-eft68.ondigitalocean.app/user/${JSON.parse(localStorage.getItem("user") as string).username}/task/${task.title}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then(() => {
                alert(`Uppgiften "${task.title}" är tillagd!`);
                task.title = "";
                rerender(!render);
            })
            .catch(() => alert(`En uppgift med titel "${task.title}" existerar redan. Försök igen!`));
    };
    const handleRemove = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const task: Task = tasks.find((task: Task) => task.title == (event.target as HTMLButtonElement).getAttribute("value")) as Task;
        fetch(`https://backend-eft68.ondigitalocean.app/user/${JSON.parse(localStorage.getItem("user") as string).username}/task/${task.title}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                alert(`Uppgiften "${task.title}" är borttagen!`);
                rerender(!render);
            });
    };
    const handleUpdate = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const task: Task = tasks.find((task: Task) => task.title == (event.target as HTMLButtonElement).getAttribute("value")) as Task;
        fetch(`https://backend-eft68.ondigitalocean.app/user/${JSON.parse(localStorage.getItem("user") as string).username}/task/${task.title}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then(() => {
                alert(`Uppgiften "${task.title}" är ${task.startTime == "" ? "påbörjad" : "avslutad"}!`);
                rerender(!render);
            });
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>Ny uppgift</h3>
                <label>Titel</label>
                <input placeholder="Ange titel..." value={task.title} name="title" onChange={handleChange} required></input>
                <button type="submit">Lägg till uppgift</button>
            </form>
            <div className="inner-container">
                <h3>Uppgifter</h3>
                <ul className="tasks">
                    {tasks.map((task: Task) => {
                        return task.endTime == "" ? (
                            <li className="task" key={task.title}>
                                <form>
                                    <h4>Titel</h4>
                                    <p>{task.title}</p>
                                    <h4>Påbörjad</h4>
                                    {<p>{task.startTime != "" ? `${new Date(task.startTime).toLocaleString().slice(0, 10)}, ${new Date(task.startTime).toLocaleString().slice(11, 19)}` : "--:--"}</p>}
                                    <button onClick={handleUpdate} value={task.title}>
                                        {task.startTime == "" ? "Påbörja" : "Avsluta"}
                                    </button>
                                    <button onClick={handleRemove} value={task.title}>
                                        Ta bort
                                    </button>
                                </form>
                            </li>
                        ) : null;
                    })}
                </ul>
            </div>
            <div className="inner-container">
                <h3>Avslutade uppgifter</h3>
                <ul className="tasks">
                    {tasks.map((task: Task) => {
                        return task.endTime != "" ? (
                            <li className="task ended-task" key={task.title}>
                                <form>
                                    <h4>Titel</h4>
                                    <p>{task.title}</p>
                                    <h4>Påbörjad</h4>
                                    <p>{`${new Date(task.startTime).toLocaleString().slice(0, 10)}, ${new Date(task.startTime).toLocaleString().slice(11, 19)}`}</p>
                                    <h4>Avslutad</h4>
                                    <p>{`${new Date(task.endTime).toLocaleString().slice(0, 10)}, ${new Date(task.endTime).toLocaleString().slice(11, 19)}`}</p>
                                    <h4>Spenderad tid</h4>
                                    <p>{getTotalTime(task)}</p>
                                </form>
                            </li>
                        ) : null;
                    })}
                </ul>
            </div>
        </>
    );
}

export default TimeTracking;
