import { Link, useParams } from "react-router-dom";
import { fetchWishlistMoviesByUser } from "../../sanity/services/userServices";
import { useEffect, useState } from "react";
import DashMovieCard from "./DashMovieCard"
import { fetchUsers } from "../../sanity/services/loginServices";

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

    const[wishlist, setWishlist] = useState()
    const [commonWishlist, setCommonWishlist] = useState()

    const getWishlistMovies = async (slug) => {
        const movies = await fetchWishlistMoviesByUser(slug);
        setWishlist(movies)
    }

    useEffect(() => {
        getWishlistMovies(slug)
        //console.log("User movie wishlist: ", wishlist)
    }, [slug])


    // Filmer to brukere har felles på ønskeliste
    const getCommonWishlistMoviesForUsers = async (user1, user2) => {
        const user1Wishlist = await fetchWishlistMoviesByUser(user1);
        const user2Wishlist = await fetchWishlistMoviesByUser(user2);
        const commonWishes = [];

        for (const user1movie of user1Wishlist.wishlist) {
            for (const user2movie of user2Wishlist.wishlist) {
                if (user1movie.imdbid === user2movie.imdbid) {
                    commonWishes.push(user1movie);
                    break; 
                }
            }
        }

        setCommonWishlist(commonWishes);
        //console.log("user1 list: ", user1Wishlist)
        //console.log("user2 list: ", user2Wishlist)
        //console.log("common list:", commonWishes)
    }

    useEffect(() => {
        getCommonWishlistMoviesForUsers(bruker1, bruker2)
    }, [slug])

    
    
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
                {commonWishlist?.map((movie, index) => 
                <DashMovieCard key={index} imdbId={movie.imdbid} />)}
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