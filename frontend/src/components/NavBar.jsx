import { Link } from "react-router-dom"
import "../styles.css"
import { useState } from "react";

export default function NavBar({LoggedInUser, setLoggedInUser, setLoggedIn}){

    const handleLogout = () => {
        localStorage.removeItem('LoggedInUser');
        setLoggedIn(false);
        setLoggedInUser(null)
      };
    return(
        <>
        <nav>
            <Link id="logo" to={`/Frontpage/${LoggedInUser}`}>What to see</Link>
            <ul>               
                <li><Link to={`/Frontpage/${LoggedInUser}`}>Hva skal jeg Se</Link></li>
                <li><Link to="/genres">Bla igjennom sjangere</Link></li>
                <li><p> {LoggedInUser}</p></li>
                <li><Link to={"/"} onClick={handleLogout}>Logg ut</Link></li>
            </ul>
        </nav>
        </>
    )
}