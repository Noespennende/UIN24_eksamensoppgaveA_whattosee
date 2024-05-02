import { useEffect } from "react";
import { useState } from "react";
import { fetchAllGenres } from "../../sanity/services/genreServices";
import GenreCard from "./GenreCard";
import { fetchUserId } from "../../sanity/services/userServices";
import { fetchFavoriteGenreByUser } from "../../sanity/services/userServices";

export default function Genres(){
    const [genreList, setGenreList] = useState([])
    const [userGenres, setUserGenres] = useState([])
    const [userId, setUserId] = useState("")
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'))

    const getUserId = async () => {
        const userIdData = await fetchUserId(loggedInUser)
        setUserId(userIdData[0].id)
    }

    const getGenreData = async () => {
        const userData = await fetchFavoriteGenreByUser(loggedInUser)
        const genreData = await fetchAllGenres()
        setGenreList(genreData)
        setUserGenres(userData[0].favorites)

    }

    useEffect(() => {
        getUserId()
        getGenreData()
    },[])

    return(
        <section>
            <h1>Sjangere</h1>
            <ul>
                {genreList?.map((genre, index) => <li key={"genre"+index}><GenreCard title={genre.genretitle} genreId={genre.id} url={genre.url} userGenres={(userGenres) ? (userGenres) : ([])} userId={userId} index={index}/></li>)}
            </ul>
        </section>
    )
}