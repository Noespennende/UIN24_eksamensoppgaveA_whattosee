import MovieCard from "./MovieCard"
import { useState } from "react"
import { useEffect} from "react"
import { useParams } from "react-router-dom"
import {apiClient} from "../../imdbapi/apiClient"
import { fetchAllMovies, fetchMoviesByGenre } from "../../sanity/services/movieServices"


export default function Genre(){
    const [movieList, setMovieList] = useState()
    const [imdb, setImdb] = useState([])
    const {slug} = useParams()
    let movieCount = 0

    const getMovieData = async (slug) => {
        const sanityData = await fetchMoviesByGenre(slug)
        sanityData?.map((movie) => fetchImdbData(movie.imdbid))
        console.log(slug)
        setMovieList(sanityData)
        
    }

    const fetchImdbData = async(movieId) => {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/${movieId}`;
        try {
            const response = await fetch(url, apiClient);
            const result = await response.json();
            imdb.push({
                url: result.results.primaryImage.url,
                caption: result.results.primaryImage.caption.plainText
            })
        } catch (error) {
            console.error(error);
        }
    }
    
        useEffect(() => {
            getMovieData(slug)
            console.log(imdb)
        },[slug])

    return(
        <main>
            <h1>Sjanger: {slug} ({movieList?.size} filmer)</h1>
            <ul>
                {movieList?.map((movie, index) => <li key={"movie"+index}><MovieCard title={movie.movietitle} image={imdb[index].url} imageText={imdb[index].caption} imdbId={movie.imdbid}/></li>)}
            </ul>
        </main>
    )

}