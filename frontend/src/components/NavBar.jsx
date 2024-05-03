import { Link } from "react-router-dom"
import "../styles.css"
import { useState } from "react";

export default function NavBar({LoggedInUser, setLoggedInUser, setLoggedInn}){

    const handleLogout = () => {
        localStorage.removeItem('LoggedInUser');
        setLoggedInn(false);
        setLoggedInUser(null)
      };
    return(
        <>
        <nav>
        {LoggedInUser ? (
            <>
            <Link id="logo" to={`/Frontpage/${LoggedInUser}`}>What to see</Link>
            <ul>               
                <li><Link to={`/Frontpage/${LoggedInUser}`}>Hva skal jeg se</Link></li>
                <li><Link to="/genres">Bla igjennom sjangere</Link></li>
                <li><p> {LoggedInUser}</p></li>
                <li><Link to={"/"} onClick={handleLogout}>Logg ut</Link></li>
            </ul>
            </>
        ): null }
        </nav>
        </>
    )
}