import Moviecard from "./MovieCard"
import { useState } from "react"
import { useEffect } from "react"
import {apiClient} from "../../imdbapi/apiClient"


export default function Genre(){
    const [genreList, setGenreList] = useState()
    const [film, setFilm] = useState()
    const imdbID = "tt0086250"

    const getFilmData = async(imdbID) => {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/${imdbID}`;
        try {
            const response = await fetch(url, apiClient);
            const result = await response.json();
            console.log(result.results);
        } catch (error) {
            console.error(error);
        }
    }
    
        useEffect(() => {
            getFilmData(imdbID)
            console.log(film)
        },[])

    return(
        <main>
            <h1>Sjanger: Sjangernavn (x filmer)</h1>
            <Moviecard/>
        </main>
    )

}