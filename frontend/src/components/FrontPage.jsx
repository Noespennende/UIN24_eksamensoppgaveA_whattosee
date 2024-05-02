import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchUsers } from '../../sanity/services/loginServices'
import { fetchWishlistMoviesByUser } from "../../sanity/services/userServices"
import MovieCard from './MovieCard'
import { apiClient } from "../../imdbapi/apiClient"


export default function FrontPage({ onLogout, imdbId, loggedInUser}) {
    const { slug } = useParams()
    const [users, setUsers] = useState([])
    const [wishlist, setWishlist] = useState([])
    const wishlistArray = []
    const [imdbImage, setImdbImage] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await fetchUsers()
            const usersFiltered = allUsers.filter(user => user.username !== loggedInUser)
            console.log(usersFiltered)
            setUsers(usersFiltered)
        }
        fetchData();
    }, [loggedInUser])


    const handlelogout = () => {
        onLogout()
    }

    const getWishlistMovies = async (slug) => {
        const movies = await fetchWishlistMoviesByUser(slug)
        setWishlist(movies.wishlist)
    }

    useEffect(() => {
        getWishlistMovies(slug)
    }, [slug])




    const fetchImdbData = async (movieId) => {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/${movieId}`;
        try {
            const response = await fetch(url, apiClient)
            const result = await response.json()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchImdbData(imdbId)
        console.log("logged inn: " + loggedInUser)
    }, [imdbId])


    return (
        <>
            <h1>Hei, {slug}. Velkommen til forsiden din!</h1>
            <section id="skal_se">
                <h3>Filmer jeg skal se!</h3>
                <p>Disse filmene ligger i ønskelisten din:</p>
                {wishlist?.map((movie, index) => (
                    <MovieCard key={index} movie={movie} className={"frontPageMc"} />))}
            </section>
            <article id="se_med">
                <h3>Jeg skal se sammen med...</h3>
                <ul>
                    {users.map((user, index) => ((user.username.toLowerCase() === loggedInUser) ? ("") : (
                        <li key={index}>
                            <Link to={`/Dashboard/${user.username}`}>{user.username}</Link>
                        </li>)))}
                </ul>
            </article >
        </>
    )
}