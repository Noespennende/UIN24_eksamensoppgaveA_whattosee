import { Link } from "react-router-dom";
import { fetchUsers } from "../../sanity/services/loginServices";
import { useEffect, useState } from "react";


export default function Loginpage(){
    const [users, setUsers] = useState([])

    useEffect(()=>{
        const getUsers = async () => {
            const oneUser = await fetchUsers();
            setUsers(oneUser)
        }
        getUsers()
    }, [])


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
                <Link to={`/Dashboard/${user.username}`} key={index}><button>{user.username}</button></Link>
            ))}
        </ul>
        </>
    )
}