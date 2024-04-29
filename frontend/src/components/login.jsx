import { Link } from "react-router-dom";

export default function Loginpage(){

    return (
        <>
        <ul>
        <li>
        <Link to="/Dashboard">dashboard</Link>
        </li>
        <li>
        <Link to="/Frontpage">frontpage</Link>
        </li>
        </ul>
        <ul>
        <button>navn</button>
        <button>navn2</button>
        <button>navn3</button>
        </ul>
        </>
    )
}