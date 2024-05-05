import "./style.css";
import userIcon from "../../assets/user-icon.svg";
import logo from "../../assets/icon2.svg";
import { useEffect, useState } from "react";
import { Member } from "../Main";

function Members() {
    const [members, setMembers] = useState<Member[]>([]);
    useEffect(() => {
        fetch("https://backend-eft68.ondigitalocean.app/users")
            .then((res) => res.json())
            .then((data) => setMembers(data));
    }, []);
    return (
        <ul>
            {members.map((member: Member) => (
                <li key={member.username}>
                    <img src={userIcon}></img>
                    <p>{member.username}</p>
                    <img src={logo} />
                    <p>{member.tasks.length == 0 ? "00:00" : "Qhej"}</p>
                </li>
            ))}
        </ul>
    );
}
export default Members;
