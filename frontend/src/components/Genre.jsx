import MovieCard from "./Moviecard"
import { useState } from "react"
import { useEffect} from "react"
import { useParams } from "react-router-dom"
import {apiClient} from "../../imdbapi/apiClient"
import { fetchAllMovies, fetchMoviesByGenre } from "../../sanity/services/movieServices"


export default function Genre(){
    const [movieList, setMovieList] = useState([])
    const {slug} = useParams()

    const getMovieData = async (slug) => {
        const sanityData = await fetchMoviesByGenre(slug)
        setMovieList(sanityData)
    }
        useEffect(() => {
            getMovieData(slug)
        },[slug])

    return(
        <main>
            <h1>Sjanger: {slug} ({movieList.length} filmer)</h1>
            <ul>
                {movieList?.map((movie, index) => <li key={"movie"+index}><MovieCard title={movie.movietitle} imdbId={movie.imdbid}/></li>)}
            </ul>
        </main>
    )

}