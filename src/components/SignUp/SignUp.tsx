import { ChangeEvent, FormEvent, useState } from "react";
import "./style.css";

interface Props {
    setPage: (page: string) => void;
}

interface Input {
    username: string;
    password: string;
    passwordConfirm: string;
}

function SignUp(props: Props) {
    const [input, setInput] = useState<Input>({
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setInput((values) => ({ ...values, [event.target.name]: event.target.value }));
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (input.password == input.passwordConfirm) {
            fetch("https://backend-eft68.ondigitalocean.app/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: input.username,
                    password: input.password,
                }),
            })
                .then((res) => res.json())
                .then(() => {
                    alert(`Användaren "${input.username}" är nu registrerad!`);
                    props.setPage("Hem");
                })
                .catch(() => alert(`Användaren "${input.username}" existerar redan. Försök igen!`));
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
