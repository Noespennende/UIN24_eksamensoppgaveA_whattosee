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
            <header>
                <nav>
                <h2>What to see</h2>
                    <ul>               
                        <li><Link to={`/Frontpage/${LoggedInUser}`}>Hva skal jeg Se</Link></li>
                        <li><Link to="/genres">Bla igjennom sjangere</Link></li>
                        <li><Link to={`/Dashboard/${LoggedInUser}`}>{LoggedInUser}</Link></li>
                        <Link to={"/"} onClick={handleLogout}>Logg ut</Link>
                    </ul>
                </nav>
            </header>
        </>
    )
}