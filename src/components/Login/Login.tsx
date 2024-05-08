import "./style.css";
import { ChangeEvent, FormEvent, useState } from "react";
import type { Member } from "../Main/";

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
                localStorage.setItem("user", (data as Member).username);
                alert(`Användaren "${input.username}" är nu inloggad!`);
                props.setPage("Hem");
            })
            .catch(() => alert(`Användaren "${input.username}" med lösenordet "${input.password}" existerar inte. Försök igen!`));
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
