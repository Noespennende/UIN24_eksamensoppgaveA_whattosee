import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'



export default function FrontPage() {
    const { slug } = useParams()


    return (
        <>
            <NavBar></NavBar>
            <h1>Hei, {slug}. Velkommen til forsiden din!</h1>
            <Link to="/"><button>logout</button></Link>
            <section id="skal_se">
                <h3>Filmer jeg skal se!</h3>
            </section>
            <section id="film_ønskeliste">
                <p>Disse filmene ligger i ønskelisten din:</p>
            </section>
            <article id="se_med">
                <h3>Jeg skal se sammen med...</h3>
                <ul>Liste med andre brukere her</ul>
            </article>
        </>
    )
}