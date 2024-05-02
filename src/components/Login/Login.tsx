import "./style.css";

function Login() {
    return (
        <form>
            <label>Användarnamn</label>
            <input placeholder="Ange användarnamn..." maxLength={64} required></input>
            <label>Lösenord</label>
            <input placeholder="Ange lösenord..." type="password" minLength={12} maxLength={64} required></input>
            <button type="submit">Logga in</button>
        </form>
    );
}

export default Login;
