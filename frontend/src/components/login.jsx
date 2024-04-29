import { Link } from "react-router-dom";

export default function Loginpage(){

    return (
        <>
       <ul>
            <li><Link to="/Dashboard">Dashboard</Link></li>
            <li><Link to="/Frontpage">Frontpage</Link></li>
            <li><Link to="/genre">Genre</Link></li>
            <li><Link to="/user/genre">User Genre</Link></li>
        </ul>
        <ul>
        <button>navn</button>
        <button>navn2</button>
        <button>navn3</button>
        </ul>
        </>
    )
}