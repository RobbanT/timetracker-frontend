import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";

interface Input {
    username: string;
    password: string;
    passwordConfirm: string;
}

function SignUp() {
    const [input, setInput] = useState<Input>({
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput((values) => ({ ...values, [event.target.name]: event.target.value }));
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (input.password == input.passwordConfirm) {
            fetch(`https://backend-eft68.ondigitalocean.app/user/${input.username}`)
                .then((res) => res.json())
                .then((data) => {
                    alert(data.username);
                });
            fetch("https://backend-eft68.ondigitalocean.app/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: input.username,
                    password: input.password,
                }),
            });
        } else {
            alert("Lösenorden stämmer inte överens. Försök igen!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Användarnamn</label>
            <input placeholder="Ange användarnamn..." value={input.username} name="username" onChange={handleChange} minLength={5} maxLength={64} required></input>
            <label>Lösenord</label>
            <input placeholder="Ange lösenord..." value={input.password} name="password" onChange={handleChange} minLength={5} maxLength={64} required></input>
            <label>Bekräfta lösenord</label>
            <input placeholder="Bekräfta lösenord..." value={input.passwordConfirm} name="passwordConfirm" onChange={handleChange} minLength={5} maxLength={64} required></input>
            <button type="submit">Bli medlem</button>
        </form>
    );
}
export default SignUp;
