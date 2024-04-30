import { Link } from "react-router-dom";

export default function MovieCard({title, image, imageText, imdbId}) {
    return (
        <article>
            <Link to={`https://www.imdb.com/title/${imdbId}`}>
                <picture>
                    <source media="(min-width:300px)" srcset={image}/>
                    <img src={image} alt={imageText}  width="300"></img>
                </picture>
            </Link>
            <Link to={`https://www.imdb.com/title/${imdbId}`}>
                <h3>{title}</h3>
            </Link>
        </article>
        
    )
}