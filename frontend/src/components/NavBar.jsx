import { Link } from "react-router-dom"
import "../styles.css"

export default function NavBar(){

    return(
        <>
            <header>
                <nav>
                <h2>What to see</h2>
                    <ul>
                        <li>Hva skal jeg se?</li>
                        <li><Link to={"/genres"}>Bla igjennom sjangere</Link></li>
                        <li>PersonId</li>
                    </ul>
                </nav>
            </header>
        </>
    )
}