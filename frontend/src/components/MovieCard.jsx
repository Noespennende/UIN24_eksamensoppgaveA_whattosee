import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect} from "react";
import { apiClient } from "../../imdbapi/apiClient";

export default function MovieCard({movie, className}) {


    const [imdbImage] = useState({
        url: movie.primaryImage?.url,
        caption: movie.primaryImage?.caption?.plainText
    })


    return (
        <article className={className}>
            {(imdbImage.url) ?
            (<Link to={`https://www.imdb.com/title/${movie?.id}`}>
                <picture>
                    <source media="(min-width:300px)" srcSet={imdbImage?.url}/>
                    <img src={imdbImage?.url} alt={imdbImage?.caption}  width="300" height="420"></img>
                </picture>
            </Link>)
            :
            (//Bilde hentet fra: https://www.flaticon.com/free-icon/photo_15402170?related_id=15402170
            <picture>
                <source media="(min-width:300px)" srcSet="../../public/ImageNotFound.png"/>
                <img src={"ImageNotFound.png"} alt="Denne filmen har ikke bilde"  width="300" height="420"></img>
            </picture>)}
            <Link className="movieCardTitle" to={`https://www.imdb.com/title/${movie?.id}`}>
                {movie?.titleText?.text}
            </Link>
        </article>
        
    )
}