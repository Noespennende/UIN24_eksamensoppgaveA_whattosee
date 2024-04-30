import { useEffect } from "react";
import { useState } from "react";
import { fetchAllGenres } from "../../sanity/services/genreServices";
import GenreCard from "./GenreCard";
import { fetchAllMovies } from "../../sanity/services/movieServices";
import { fetchLoggedInUser } from "../../sanity/services/loginServices";
import { fetchFavoriteGenreByUser } from "../../sanity/services/userServices";

export default function Genres(){
    const [genreList, setGenreList] = useState([])
    const [userGenres, setUserGenres] = useState([])
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'))

    const getGenreData = async () => {
        const userData = await fetchFavoriteGenreByUser(loggedInUser)
        const genreData = await fetchAllGenres()
        setGenreList(genreData)
        setUserGenres(userData[0].favorites)

    }

    useEffect(() => {
        getGenreData()
    },[])

    return(
        <main>
            <h1>Sjangere</h1>
            <ul>
                {genreList?.map((genre, index) => <li key={"genre"+index}><GenreCard title={genre.genretitle} url={genre.url} userGenres={userGenres}/></li>)}
            </ul>
        </main>
    )
}