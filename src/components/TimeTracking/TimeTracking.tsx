import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { Task } from "../Main/";
import { loadUser } from "../Main/";
import "./style.css";

interface Props {
    rerender: (render: boolean) => void;
    render: boolean;
}

function TimeTracking(props: Props) {
    const getTotalTime = (task: Task): string => {
        const totalTime: number = new Date(task.endTime).getTime() - new Date(task.startTime).getTime();
        const hours = Math.floor(totalTime / 60 / 60 / 1000);
        const minutes = Math.floor((totalTime - hours * 1000 * 60 * 60) / 1000 / 60);
        return `${hours}h:${minutes}min`;
    };

    const [task, setTask] = useState<Task>({
        title: "",
        startTime: "",
        endTime: "",
    });

    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        fetch(`https://backend-eft68.ondigitalocean.app/user/${loadUser().username}/tasks`)
            .then((res) => res.json())
            .then((data) => setTasks(data));
        props.rerender(!props.render);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTask((values) => ({ ...values, [event.target.name]: event.target.value }));
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch(`https://backend-eft68.ondigitalocean.app/user/${loadUser().username}/task/${task.title}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then(() => {
                alert(`Uppgiften "${task.title}" är tillagd!`);
            })
            .catch(() => alert(`En uppgift med titel "${task.title}" existerar redan. Försök igen!`));
    };
    const handleRemove = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const task: Task = tasks.find((task: Task) => task.title == (event.target as HTMLButtonElement).getAttribute("value")) as Task;
        fetch(`https://backend-eft68.ondigitalocean.app/user/${loadUser().username}/task/${task.title}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                alert(`Uppgiften "${task.title}" är borttagen!`);
                props.rerender(!props.render);
            });
    };
    const handleUpdate = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const task: Task = tasks.find((task: Task) => task.title == (event.target as HTMLButtonElement).getAttribute("value")) as Task;
        fetch(`https://backend-eft68.ondigitalocean.app/user/${loadUser().username}/task/${task.title}`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then(() => {
                alert(`Uppgiften "${task.title}" är ${task.startTime == "" ? "påbörjad" : "avslutad"}!`);
                props.rerender(!props.render);
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
                    {tasks.length != 0 ? (
                        tasks.map((task: Task) => {
                            return task.endTime == "" ? (
                                <li className="task" key={task.title}>
                                    <form>
                                        <h4>Titel</h4>
                                        <p>{task.title}</p>
                                        <h4>Påbörjad</h4>
                                        {<p>{task.startTime != "" ? task.startTime : "--:--"}</p>}
                                        <button onClick={handleUpdate} value={task.title}>
                                            {task.startTime == "" ? "Påbörja" : "Avsluta"}
                                        </button>
                                        <button onClick={handleRemove} value={task.title}>
                                            Ta bort
                                        </button>
                                    </form>
                                </li>
                            ) : null;
                        })
                    ) : (
                        <p>Inga uppgifter existerar.</p>
                    )}
                </ul>
            </div>
            <div className="inner-container">
                <h3>Avslutade uppgifter</h3>
                <ul className="tasks">
                    {tasks.length != 0 ? (
                        tasks.map((task: Task) => {
                            return task.endTime != "" ? (
                                <li className="task ended-task" key={task.title}>
                                    <form>
                                        <h4>Titel</h4>
                                        <p>{task.title}</p>
                                        <h4>Påbörjad</h4>
                                        <p>{task.startTime}</p>
                                        <h4>Avslutad</h4>
                                        <p>{task.endTime}</p>
                                        <h4>Spenderad tid</h4>
                                        <p>{getTotalTime(task)}</p>
                                    </form>
                                </li>
                            ) : null;
                        })
                    ) : (
                        <p>Inga avslutade uppgifter existerar.</p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default TimeTracking;

/*
                <label>Starttid</label>
                <input type="datetime-local" placeholder="Ange starttid..." value={task.startTime} name="startTime" onChange={handleChange} required></input>
                <label>Sluttid</label>
                <input type="datetime-local" placeholder="Ange sluttid..." value={task.endTime} name="endTime" onChange={handleChange} required></input>
*/
