import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";

interface Inputs {
    username: string;
    password: string;
    passwordConfirm: string;
}

function SignUp() {
    const [render, rerender] = useState(false);
    const [inputs, setInputs] = useState<Inputs>({
        username: "",
        password: "",
        passwordConfirm: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInputs((values) => ({ ...values, [event.target.name]: event.target.value }));

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        fetch("https://backend-eft68.ondigitalocean.app/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: inputs.username,
                password: inputs.password,
            }),
        });
        alert(inputs.username + "\tär nu registrerad!");
        rerender(!render);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Användarnamn</label>
            <input placeholder="Ange användarnamn..." value={inputs.username} name="username" onChange={handleChange} maxLength={64} required></input>
            <label>Lösenord</label>
            <input placeholder="Ange lösenord..." value={inputs.password} name="password" onChange={handleChange} minLength={12} maxLength={64} required></input>
            <label>Bekräfta lösenord</label>
            <input placeholder="Bekräfta lösenord..." value={inputs.passwordConfirm} name="passwordConfirm" onChange={handleChange} minLength={12} maxLength={64} required></input>
            <button type="submit">Bli medlem</button>
        </form>
    );
}
export default SignUp;
