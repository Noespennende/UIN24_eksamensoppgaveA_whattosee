import { useEffect } from "react";
import { useState } from "react";
import { fetchAllGenres } from "../../sanity/services/genreServices";
import GenreCard from "./GenreCard";
import { fetchAllMovies } from "../../sanity/services/movieServices";
import { fetchLoggedInUser } from "../../sanity/services/loginServices";

export default function Genres(){
    const [genreList, setGenreList] = useState([])
    const [userGenres, setUserGenres] = useState([])

    const getGenreData = async () => {
        const genreData = await fetchAllGenres()
        const userData = await fetchLoggedInUser()
        console.log(userData)
        setGenreList(genreData)
    }

    useEffect(() => {
        getGenreData()
    },[])

    return(
        <main>
            <h1>Sjangere</h1>
            <ul>
                {genreList?.map((genre, index) => <li key={"genre"+index}><GenreCard title={genre.genretitle} url={genre.url}/></li>)}
            </ul>
        </main>
    )
}