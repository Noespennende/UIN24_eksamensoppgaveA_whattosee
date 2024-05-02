import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect} from "react";
import { apiClient } from "../../imdbapi/apiClient";

export default function MovieCard({title, imdbId, className}) {

    const [imdbImage, setImdbImage] = useState()

    const fetchImdbData = async(movieId) => {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/${movieId}`;
        try {
            const response = await fetch(url, apiClient);
            const result = await response.json();
            setImdbImage(
                {
                    url: result.results.primaryImage.url,
                    caption: result.results.primaryImage.caption.plainText
                })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchImdbData(imdbId)
    },[imdbId])


    return (
        <article htmlClass={className}>
            <Link to={`https://www.imdb.com/title/${imdbId}`}>
                <picture>
                    <source media="(min-width:300px)" srcSet={imdbImage?.url}/>
                    <img src={imdbImage?.url} alt={imdbImage?.caption}  width="300" height="420"></img>
                </picture>
            </Link>
            <Link to={`https://www.imdb.com/title/${imdbId}`}>
                <h3>{title}</h3>
            </Link>
        </article>
        
    )
}