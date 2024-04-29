import NavBar from './NavBar'
import { Link } from 'react-router-dom'



export default function Midlertidigdash( { onLogout } ) {
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'))
    
    const handlelogout =() =>{
        onLogout()
    }
    return (
        <>
            <Link to="/"><button onClick={handlelogout}>logout</button></Link>
            <h2>hællæ på dæ {loggedInUser}</h2>
        </>
    )
}
