import NavBar from './NavBar'
import { Link } from 'react-router-dom'



export default function FrontPage() {
    return (
        <>
            <NavBar></NavBar>
            <h1>Hei, Bruker. Velkommen til forsiden under konstruksjon</h1>
            <Link to="/"><button>logout</button></Link>
        </>
    )
}