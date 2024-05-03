import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";

interface Inputs {
    username: string;
    password: string;
}

interface Task {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
}

interface Member {
    username: string;
    password: string;
    tasks: Task[];
}

function Login() {
    const [member, setMember] = useState<Member>();
    const [inputs, setInputs] = useState<Inputs>({
        username: "",
        password: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInputs((values) => ({ ...values, [event.target.name]: event.target.value }));

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch(`https://backend-eft68.ondigitalocean.app/user/${inputs.username}/${inputs.password}`)
            .then((res) => res.json())
            .then((data) => {
                setMember(data);
                console.log(member);
                localStorage.setItem("user", JSON.stringify(data));
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Användarnamn</label>
            <input placeholder="Ange användarnamn..." value={inputs.username} name="username" onChange={handleChange} minLength={5} maxLength={64} required></input>
            <label>Lösenord</label>
            <input placeholder="Ange lösenord..." value={inputs.password} name="password" onChange={handleChange} type="password" minLength={5} maxLength={64} required></input>
            <button type="submit">Logga in</button>
        </form>
    );
}

export default Login;
