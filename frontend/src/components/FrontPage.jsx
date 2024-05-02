import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchUsers } from '../../sanity/services/loginServices'
import { fetchWishlistMoviesByUser } from "../../sanity/services/userServices"
import MovieCard from './MovieCard'
import { apiClient } from "../../imdbapi/apiClient"
import { getMoviesData } from "../../imdbapi/apiServices"


export default function FrontPage({ onLogout, loggedInUser}) {
    const { slug } = useParams()
    const [users, setUsers] = useState([])
    const [imdbImage, setImdbImage] = useState()
    const [apiData, setApiData] = useState([])

    const [movieList, setMovieList] = useState([])

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
        setMovieList(movies.wishlist)
    }

    useEffect(() => {
        getWishlistMovies(slug)
    }, [slug])

    useEffect(() => {
        getMoviesData(movieList)
        .then(data => {
            setApiData(data)
        })
    }, [movieList])




    return (
        <>
            <h1>Hei, {slug}. Velkommen til forsiden din!</h1>
            <section id="skal_se">
                <h2>Filmer jeg skal se!</h2>
                <p>Disse filmene ligger i ønskelisten din:</p>
                {apiData?.map((movie, index) => (
                    <MovieCard key={index} movie={movie} className={"frontPageMc"} />))}
            </section>
            <section id="se_med">
                <h3>Jeg skal se sammen med...</h3>
                <ul>
                    {users.map((user, index) => ((user.username.toLowerCase() === loggedInUser) ? ("") : (
                        <li key={index}>
                            <Link to={`/Dashboard/${user.username}`}>{user.username}</Link>
                        </li>)))}
                </ul>
            </section >
        </>
    )
}