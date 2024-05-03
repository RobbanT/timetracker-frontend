import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";

interface Props {
    setPage: (page: string) => void;
}

interface Input {
    username: string;
    password: string;
}

function Login(props: Props) {
    const [input, setInput] = useState<Input>({
        username: "",
        password: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput((values) => ({ ...values, [event.target.name]: event.target.value }));

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch(`https://backend-eft68.ondigitalocean.app/user/${input.username}/${input.password}`)
            .then((res) => res.json())
            .then((data) => {
                localStorage.setItem("user", JSON.stringify(data));
                props.setPage("Hem");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Användarnamn</label>
            <input placeholder="Ange användarnamn..." value={input.username} name="username" onChange={handleChange} minLength={5} maxLength={64} required></input>
            <label>Lösenord</label>
            <input placeholder="Ange lösenord..." value={input.password} name="password" onChange={handleChange} type="password" minLength={5} maxLength={64} required></input>
            <button type="submit">Logga in</button>
        </form>
    );
}

export default Login;
