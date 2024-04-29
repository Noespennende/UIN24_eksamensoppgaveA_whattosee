import Moviecard from "./MovieCard"
import { useState } from "react"
import { useEffect } from "react"
import { fetchByImdbId } from "../../imdbapi/services/imdbServices"


export default function Genre(){
    const [genreList, setGenreList] = useState()
    const [film, setFilm] = useState()

    const getImdbTitle = async() => {
        fetchByImdbId("", setFilm)
        }
    
        useEffect(() => {
            getImdbTitle()
            console.log(film)
        },[])

    return(
        <main>
            <h1>Sjanger: Sjangernavn (x filmer)</h1>
            <Moviecard/>
        </main>
    )

}