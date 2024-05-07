import { ChangeEvent, FormEvent, useState } from "react";
import type { Task } from "../Main/";
import { loadMember } from "../Main/";
import logo from "../../assets/icon2.svg";
import "./style.css";

function TimeTracking() {
    const [task, setTask] = useState<Task>({
        title: "",
        startTime: "",
        endTime: "",
    });

    const getTotalTime = (task: Task): string => {
        const totalTime: number = new Date(task.endTime).getTime() - new Date(task.startTime).getTime();
        const hours = Math.floor(totalTime / 60 / 60 / 1000);
        const minutes = Math.floor((totalTime - hours * 1000 * 60 * 60) / 1000 / 60);
        return `${hours}h:${minutes}min`;
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTask((values) => ({ ...values, [event.target.name]: event.target.value }));

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch(`https://backend-eft68.ondigitalocean.app/user/${loadMember().username}/task/${task.title}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
            </form>
            <ul>
                <h3>Uppgifter</h3>
                {loadMember().tasks.length != 0 ? (
                    loadMember().tasks.map((task: Task) => {
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
                {loadMember().tasks.length != 0 ? (
                    loadMember().tasks.map((task: Task) => {
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
