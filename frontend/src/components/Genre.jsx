import MovieCard from "./MovieCard"
import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchMoviesByGenre } from "../../sanity/services/movieServices"
import { getMoviesData } from "../../imdbapi/apiServices"


export default function Genre() {
    const [movieList, setMovieList] = useState([])
    const { slug } = useParams()

    const getMovieData = async (slug) => {
        const sanityData = await fetchMoviesByGenre(slug)
        setMovieList(sanityData)
    }
    useEffect(() => {
        getMovieData(slug)

    }, [slug])

    const [movieApiData, setMovieApiData] = useState()

    useEffect(() => {
        getMoviesData(movieList)
        .then(data => {
            setMovieApiData(data)
        })
    }, [movieList])


    return (
        <section>
            <h1>Sjanger: {slug?.charAt(0).toUpperCase() + slug?.slice(1)} ({movieList?.length} filmer)</h1>
            <ul>
                {movieApiData?.map((movie, index) => <li key={"movie" + index}><MovieCard movie={movie} className="mcgenre"/></li>)}   
            </ul>
        </section>
    )

    
}