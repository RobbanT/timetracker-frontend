import "./style.css";
import userIcon from "../../assets/user-icon.svg";
import logo from "../../assets/icon2.svg";
import { useEffect, useState } from "react";
import { Task, User } from "../Main";

function Members() {
    function getTotalTime(tasks: Task[]): string {
        let totalTime: number = 0;
        if (tasks.length == 0) {
            return "0h:0min";
        } else {
            tasks.forEach((task: Task) => {
                if (task.startTime != "" && task.endTime != "") {
                    totalTime += new Date(task.endTime).getTime() - new Date(task.startTime).getTime();
                }
            });
            const hours = Math.round(totalTime / 60 / 60 / 1000);
            totalTime -= hours * 1000 * 60 * 60;
            const minutes = Math.round(totalTime / 1000 / 60);
            return `${hours}h:${minutes}min`;
        }
    }
    const [members, setMembers] = useState<User[]>([]);
    useEffect(() => {
        fetch("https://backend-eft68.ondigitalocean.app/users")
            .then((res) => res.json())
            .then((data) => setMembers(data));
    }, []);
    return (
        <ul>
            {members.map((member: User) => {
                return (
                    <li key={member.username}>
                        <img src={userIcon}></img>
                        <p>{member.username}</p>
                        <img src={logo} />
                        <p>{getTotalTime(member.tasks)}</p>
                    </li>
                );
            })}
        </ul>
    );
}

export default Members;
