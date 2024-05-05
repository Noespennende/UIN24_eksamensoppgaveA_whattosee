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
            <h1>Hvem skal se idag?</h1>
            <h2>Velg bruker</h2>
            <ul id="loginlist">
                {users.map((user, index) => (
                    <li key={"brukere"+index}><Link to={`/Frontpage/${user.username}`}><button onClick={() => handleLogin(user.username)}>{user.username}</button></Link></li>
                ))}
            </ul>

        </>
    )
}