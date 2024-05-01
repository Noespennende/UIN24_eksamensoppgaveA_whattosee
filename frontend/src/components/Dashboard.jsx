import { Link, useParams } from "react-router-dom";
import { fetchWishlistMoviesByUser } from "../../sanity/services/userServices";
import { useEffect, useState } from "react";
import DashMovieCard from "./DashMovieCard"
import { fetchUsers } from "../../sanity/services/loginServices";
import { apiClient } from "../../imdbapi/apiClient";

export default function Dashboard( {onLogout}) {
    
    const[users,setUsers] = useState([])
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'))

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await fetchUsers();
            const usersFiltered = allUsers.filter(user => user.username !== loggedInUser)
            setUsers(usersFiltered)   
        }
        fetchData();
    }, [loggedInUser])

    const {slug} = useParams()

    const bruker1 = "Olaf"
    const bruker2 = "Hilde"

    const [wishlist, setWishlist] = useState([])
    const [commonWishlist, setCommonWishlist] = useState([])
    const [commonWishlistData, setCommonWishlistData] = useState([])


    const getOneUserWishlistMovies = async (slug) => {
        const movies = await fetchWishlistMoviesByUser(slug)
        setWishlist(movies)
    }

    useEffect(() => {
        getOneUserWishlistMovies(slug)
    }, [slug])


    // Sanity fetch -> setter commonWishlist -> alle filmer som to brukere har til felles
    const getCommonWishlistMoviesForUsers = async (user1, user2) => {
        const user1Wishlist = await fetchWishlistMoviesByUser(user1)
        const user2Wishlist = await fetchWishlistMoviesByUser(user2)

        const commonWishlistData = []

        for (const user1movie of user1Wishlist.wishlist) {
            for (const user2movie of user2Wishlist.wishlist) {
                if (user1movie.imdbid === user2movie.imdbid) {
                    commonWishlistData.push(user1movie)
                    break
                }
            }
        }

        setCommonWishlist(commonWishlistData);
    }

    // Tar i bruk metoden getCommonWishlistMoviesForUsers()
    useEffect(() => {
        getCommonWishlistMoviesForUsers(bruker1, bruker2)
    }, [slug])

    // Henter api-data for én film basert på imdbID
    const getMovieData = async (imdbID) => {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/${imdbID}`
        return await fetch(url, apiClient)
        .then(response => response.json())
        .catch(error => console.error(error))
    }

    // Henter api-data for alle filmer i "moviesList"
    const getMoviesData = async (moviesList) => {
        const moviesData = []
        for (const movie of moviesList) {
            const movieData = await getMovieData(movie.imdbid); 
            moviesData.push(movieData.results)
        }
        return moviesData
        
    }

    // Tar i bruk funksjonen getMoviesData() for å hente alle filmer, og bruker "felles" listen
    useEffect(() => {
        getMoviesData(commonWishlist)
        .then(data => {
            setCommonWishlistData(data)
            console.log("test", data)
            console.log("halloo", commonWishlistData);
        })
    }, [commonWishlist])


    
    
    const handlelogout =() =>{
        onLogout()
    }

    return(
        <main>
            {users.map((user, index) => (
            <h1 key={index}>Forslag til {user.username}</h1>))}
            <h3>Forslag for Bruker1 og Bruker2</h3>
            <section>
                <h2>Catch up!</h2>
                {commonWishlistData?.map((movie, index) => 
                <DashMovieCard key={index} movie={movie} />)}
            </section>
            <section>
                <h2>Go safe!</h2>
                <DashMovieCard/>
            </section>
            <section>
                <h2>Utforsk!</h2>
                <DashMovieCard/>
            </section>
            <Link to="/"><button onClick={handlelogout}>logout</button></Link>
            <h2>hællæ på dæ {loggedInUser}</h2>
        </main>
        
    )
}