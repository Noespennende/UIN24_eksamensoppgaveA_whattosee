import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect} from "react";
import { apiClient } from "../../imdbapi/apiClient";

export default function MovieCard({movie, className}) {


    const [imdbImage] = useState({
        url: movie.primaryImage.url,
        caption: movie.primaryImage.caption.plainText
    })

    return (
        <article className={className}>
            <Link to={`https://www.imdb.com/title/${movie.imdbid}`}>
                <picture>
                    <source media="(min-width:300px)" srcSet={imdbImage?.url}/>
                    <img src={imdbImage?.url} alt={imdbImage?.caption}  width="300" height="420"></img>
                </picture>
            </Link>
            <Link to={`https://www.imdb.com/title/${movie.imdbid}`}>
                <h3>{movie.titleText.text}</h3>
            </Link>
        </article>
        
    )
}