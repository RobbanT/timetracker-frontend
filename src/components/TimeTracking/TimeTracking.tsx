import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { Member, Task } from "../Main/";
import { loadMember } from "../Main/";
import "./style.css";

function TimeTracking() {
    const getTotalTime = (task: Task): string => {
        const totalTime: number = new Date(task.endTime).getTime() - new Date(task.startTime).getTime();
        const hours = Math.floor(totalTime / 60 / 60 / 1000);
        const minutes = Math.floor((totalTime - hours * 1000 * 60 * 60) / 1000 / 60);
        return `${hours}h:${minutes}min`;
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setTask((values) => ({ ...values, [event.target.name]: event.target.value }));
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        fetch(`https://backend-eft68.ondigitalocean.app/user/${loadMember().username}/tasks}`)
            .then((res) => res.json())
            .then((data) => setTasks(data));
        const member: Member = loadMember();
        member.tasks = tasks;
        console.log("hej på dig.");
    });
    const [task, setTask] = useState<Task>({
        title: "",
        startTime: "",
        endTime: "",
    });

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
                alert(`Uppgiften "${task.title}" är tillagd!`);
                const member: Member = loadMember();
                member.tasks.push(task);
                localStorage.setItem("user", JSON.stringify(member));
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
                <button type="submit">Lägg till uppgift</button>
            </form>
            <div className="inner-container">
                <h3>Uppgifter</h3>
                <ul className="tasks">
                    {loadMember().tasks.length != 0 ? (
                        loadMember().tasks.map((task: Task) => {
                            return task.endTime == null ? (
                                <li key={task.title}>
                                    <form className="task" onSubmit={handleUpdate}>
                                        <h4>Titel</h4>
                                        <p>{task.title}</p>
                                        <h4>Påbörjad</h4>
                                        {<p>{task.endTime != null ? getTotalTime(task) : "--:--"}</p>}
                                        <button type="submit">{task.startTime == null ? "Påbörja" : "Avsluta"}</button>
                                        <button>Ta bort</button>
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
                    {loadMember().tasks.length != 0 ? (
                        loadMember().tasks.map((task: Task) => {
                            return task.endTime != null ? (
                                <li key={task.title}>
                                    <h4>Titel</h4>
                                    <p>{task.title}</p>
                                    <h4>Påbörjad</h4>
                                    <p>{task.startTime}</p>
                                    <h4>Avslutad</h4>
                                    <p>{task.endTime}</p>
                                    <h4>Spenderad tid</h4>
                                    <p>{getTotalTime(task)}</p>
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
