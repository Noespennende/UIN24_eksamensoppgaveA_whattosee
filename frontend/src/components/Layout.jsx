import { useEffect, useState } from "react";
import NavBar from "./NavBar";

export default function Layout({children, setLoggedInn, loggedInUser, setLoggedInUser}) {


    return (
        <>
        <header>
            <NavBar LoggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} loggedInn={setLoggedInn}/>
        </header>
        <main>
            {children}
        </main>
        </>
    )
}