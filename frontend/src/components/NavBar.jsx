import { Link } from "react-router-dom"
import "../styles.css"

export default function NavBar({LoggedInUser}){

    return(
        <>
            <header>
                <nav>
                <h2>What to see</h2>
                    <ul>               
                        <li><Link to="/">Hva skal jeg Se</Link></li>
                        <li><Link to="/genres">Bla igjennom sjangere</Link></li>
                        <li><Link to="/Dashboard/:slug">{LoggedInUser}</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}