import "./style.css";
import userIcon from "../../assets/user-icon.svg";
import logo from "../../assets/icon2.svg";
import { useEffect, useState } from "react";
import { Task, Member } from "../Main";

function Members() {
    function getTotalTime(tasks: Task[]): string {
        let totalTime: number = 0;

        if (tasks.length == 0) {
            return "00:00";
        } else {
            tasks.forEach((task: Task) => {
                if (task.startTime != null && task.endTime != null) {
                    totalTime += new Date(task.endTime).getTime() - new Date(task.startTime).getTime();
                }
            });
            const diffTime: Date = new Date(totalTime);
            return `${totalTime / 60}:${diffTime.getMinutes() % 60}`;
        }
    }
    const [members, setMembers] = useState<Member[]>([]);
    useEffect(() => {
        fetch("https://backend-eft68.ondigitalocean.app/users")
            .then((res) => res.json())
            .then((data) => setMembers(data));
    }, []);
    return (
        <ul>
            {members.map((member: Member) => {
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
