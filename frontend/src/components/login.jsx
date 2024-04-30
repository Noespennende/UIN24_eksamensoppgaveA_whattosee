import { Link } from "react-router-dom";
import { fetchUsers } from "../../sanity/services/loginServices";
import { useEffect, useState } from "react";


export default function Loginpage({ onLogin }) {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const oneUser = await fetchUsers();
            setUsers(oneUser);
        }
        fetchData();
    }, [])

    const handleLogin = (username) => {
        onLogin(username)
    }



    return (
        <>
            <ul>
                <li><Link to="/Dashboard/">Dashboard</Link></li>
                <li><Link to="/Frontpage">Frontpage</Link></li>
                <li><Link to="/genre">Genre</Link></li>
                <li><Link to="/user/genre">User Genre</Link></li>
            </ul>
            <h1>Hvem skal se idag?</h1>
            <ul>
                <p>Velg Bruker</p>
                {users.map((user, index) => (
                    <Link to={`/Frontpage/${user.username}`} key={index}><button onClick={() => handleLogin(user.username)}>{user.username}</button></Link>
                ))}
            </ul>

        </>
    )
}