import "./style.css";
import Header from "../Header/";
import Nav from "../Nav/";
import Main from "../Main/";
import { useState } from "react";

function App() {
    const [page, setPage] = useState<string>("Hem");
    return (
        <>
            <Header />
            <Nav setPage={setPage} />
            <Main page={page} />
        </>
    );
}

export default App;
