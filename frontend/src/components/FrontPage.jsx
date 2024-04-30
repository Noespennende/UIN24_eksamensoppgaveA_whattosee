import { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link, useParams } from 'react-router-dom'
import { fetchUsers } from '../../sanity/services/loginServices'



export default function FrontPage( {onLogout}) {
    const { slug } = useParams()
    const [users, setUsers] = useState([])
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'))
   

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await fetchUsers();
            const usersFiltered = allUsers.filter(user => user.username !== loggedInUser)
            setUsers(usersFiltered)   
        }
        fetchData();
    }, [loggedInUser])

  
    const handlelogout =() =>{
        onLogout()
    }

    return (
        <>
            <NavBar LoggedInUser={loggedInUser}/>
            <h1>Hei, {slug}. Velkommen til forsiden din!</h1>
            <Link to="/"><button onClick={handlelogout}>logout</button></Link>
            <section id="skal_se">
                <h3>Filmer jeg skal se!</h3>
                <p>Disse filmene ligger i ønskelisten din:</p>
            </section>
            <article id="se_med">
                <h3>Jeg skal se sammen med...</h3>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>{user.username}</li>
                    ))}
                </ul>
            </article>
        </>
    )
}