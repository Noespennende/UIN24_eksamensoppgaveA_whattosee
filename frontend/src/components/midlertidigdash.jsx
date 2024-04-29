import NavBar from './NavBar'
import { Link } from 'react-router-dom'



export default function Midlertidigdash(){
    return(
        <>
        <NavBar></NavBar>
        <h1>dashboard</h1>
        <Link to="/"><button>logout</button></Link>
        </>
    )
}