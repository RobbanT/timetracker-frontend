import { useState } from "react";
import "./style.css";

function SignUp() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event: any) => {
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Användarnamn</label>
            <input placeholder="Ange användarnamn..." name="username" onChange={handleChange} maxLength={64} required></input>
            <label>Lösenord</label>
            <input placeholder="Ange lösenord..." name="password" onChange={handleChange} type="password" minLength={12} maxLength={64} required></input>
            <label>Bekräfta lösenord</label>
            <input placeholder="Bekräfta lösenord..." name="passwordConfirm" onChange={handleChange} type="password" minLength={12} maxLength={64} required></input>
            <button type="submit">Bli medlem</button>
        </form>
    );
}
export default SignUp;
