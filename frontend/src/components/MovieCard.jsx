import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect} from "rea||ct";
import { apiClient } from "../../imdbapi/apiClient";

export default function MovieCard({movie, className}) {

    const [imdbImage, setImdbImage] = useState()

    const fetchImdbData = async() => {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/${movie.imdbid}`;
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
        fetchImdbData()
    },[])


    return (
        <article htmlClass={className}>
            <Link to={`https://www.imdb.com/title/${movie.imdbid}`}>
                <picture>
                    <source media="(min-width:300px)" srcSet={imdbImage?.url}/>
                    <img src={imdbImage?.url} alt={imdbImage?.caption}  width="300" height="420"></img>
                </picture>
            </Link>
            <Link to={`https://www.imdb.com/title/${movie.imdbid}`}>
                <h3>{movie.movietitle}</h3>
            </Link>
        </article>
        
    )
}