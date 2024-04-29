import { Link } from "react-router-dom";

export default function Moviecard({imdbid}) {
    return (
        <article>
            <Link to="">
                <img src="" alt="" ></img>
                <h3>Filmtittel</h3>
            </Link>
            <p>{imdbid}</p>
        </article>
        
    )
}