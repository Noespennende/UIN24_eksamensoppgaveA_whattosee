import { Link } from "react-router-dom";

export default function GenreCard({title, url}){
    return(
        <article>
            <Link to={`/${url}/genre`}>{title}</Link>
            <button>Legg til favoritter</button>
        </article>
    )
}