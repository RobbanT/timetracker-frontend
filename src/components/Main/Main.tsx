import "./style.css";

interface Props {
    page: string;
}

function Main(props: Props) {
    return (
        <main>
            <div className="container">
                <h2>{props.page}</h2>
                {{
                    Hem: <Home />,
                    Tidsrapportering: <TimeTracking />,
                    Medlemmar: <Members />,
                    "Logga in": <Login />,
                    "Bli medlem": <SignUp />,
                }[props.page] || <Home />}
            </div>
        </main>
    );
}

function Home() {
    return (
        <article>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae. Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit
                necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat
                asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae.
                Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex?
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae. Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit
                necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat
                asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae.
                Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex?
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae. Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit
                necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat
                asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae.
                Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex?
            </p>
        </article>
    );
}

function TimeTracking() {
    return <></>;
}

function Members() {
    return (
        <ul>
            <li>
                {"hej_hej@hotmail.com"}, Incheckad tid: {new Date().toDateString()}
            </li>
            <li>
                {"hej_hej@hotmail.com"}, Incheckad tid: {new Date().toDateString()}
            </li>{" "}
            <li>
                {"hej_hej@hotmail.com"}, Incheckad tid: {new Date().toDateString()}
            </li>{" "}
            <li>
                {"hej_hej@hotmail.com"}, Incheckad tid: {new Date().toDateString()}
            </li>{" "}
            <li>
                {"hej_hej@hotmail.com"}, Incheckad tid: {new Date().toDateString()}
            </li>{" "}
            <li>
                {"hej_hej@hotmail.com"}, Incheckad tid: {new Date().toDateString()}
            </li>
        </ul>
    );
}

function Login() {
    return (
        <form>
            <label>E-postadress</label>
            <input placeholder="Ange e-postadress..." type="email" maxLength={64} required></input>
            <label>Lösenord</label>
            <input placeholder="Ange lösenord..." type="password" minLength={12} maxLength={64} required></input>
            <button type="submit">Logga in</button>
        </form>
    );
}

function SignUp() {
    return (
        <form>
            <label>E-postadress</label>
            <input placeholder="Ange e-postadress..." type="email" maxLength={64} required></input>
            <label>Lösenord</label>
            <input placeholder="Ange lösenord..." type="password" minLength={12} maxLength={64} required></input>
            <label>Bekräfta lösenord</label>
            <input placeholder="Bekräfta lösenord..." type="password" minLength={12} maxLength={64} required></input>
            <button type="submit">Bli medlem</button>
        </form>
    );
}

export default Main;
