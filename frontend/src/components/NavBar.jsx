import { Link } from "react-router-dom"
import "../styles.css"
import { useState } from "react";

export default function NavBar({LoggedInUser}){
    const [loggedIn, setIsLoggedIn] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('LoggedInUser');
        setIsLoggedIn(false);
      };
    return(
        <>
            <header>
                <nav>
                <h2>What to see</h2>
                    <ul>               
                        <li><Link to="/">Hva skal jeg Se</Link></li>
                        <li><Link to="/genres">Bla igjennom sjangere</Link></li>
                        <li><Link to="/Dashboard/:slug">{LoggedInUser}</Link></li>
                        <Link to={"/"} onClick={handleLogout}>Logg ut</Link>
                    </ul>
                </nav>
            </header>
        </>
    )
}