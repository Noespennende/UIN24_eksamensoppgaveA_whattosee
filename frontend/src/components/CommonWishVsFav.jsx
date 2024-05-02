import { useEffect, useState } from "react"
import { getMoviesData } from "../../imdbapi/apiServices"
import { fetchFavoriteMoviesByUser, fetchWishlistMoviesByUser } from "../../sanity/services/userServices"
import MovieCard from "./MovieCard"

export default function CommonWishVsFav({user1, user2}) {

    const [movieIDsUser1WishVsUser2Fav, setMovieIDsUser1WishVsUser2Fav] = useState([])
    const [moviesDataUser1WishVsUser2Fav, setMoviesDataUser1WishVsUser2Fav] = useState([])
    const [movieIDsUser2WishVsUser1Fav, setMovieIDsUser2WishVsUser1Fav] = useState([])
    const [moviesDataUser2WishVsUser1Fav, setMoviesDataUser2WishVsUser1Fav] = useState([])
    
    const getCommonMoviesFromWishAndFav = async (user1, user2) => {
        const user1Wish = await fetchWishlistMoviesByUser(user1)
        const user2Wish = await fetchWishlistMoviesByUser(user2)
        const user1Fav = await fetchFavoriteMoviesByUser(user1)
        const user2Fav = await fetchFavoriteMoviesByUser(user2)
        
        const user1WishMovieIDs = []
        const user2WishMovieIDs = []

        if (user1Wish.wishlist && user2Fav.favoriteMovies) {
            for(const user1movie of user1Wish.wishlist){
                for(const user2movie of user2Fav.favoriteMovies){
                    if(user1movie.imdbid === user2movie.imdbid){
                        user2WishMovieIDs.push(user1movie)
                        break
                    }
                    
                }
            }
        }

        if (user1Fav.favoriteMovies && user2Wish.wishlist ) {
            for(const user1movieFav of user1Fav?.favoriteMovies){
                for(const user2movieWish of user2Wish?.wishlist){           
                    if(user1movieFav.imdbid === user2movieWish.imdbid){
                        user1WishMovieIDs.push(user1movieFav)
                        
                        break
                    }
                }
            }
        }

        setMovieIDsUser1WishVsUser2Fav(user1WishMovieIDs)
        setMovieIDsUser2WishVsUser1Fav(user2WishMovieIDs)
    }

    // "Initialiserer" getCommonMoviesFromWishAndFav()
    useEffect(() => {
        getCommonMoviesFromWishAndFav(user1, user2)   
    }, [user2])

    /// "Initialiserer" getMoviesData() for bruker1 sin ønskeliste mot bruker2 sin favorittliste
    useEffect(() => {
        getMoviesData(movieIDsUser1WishVsUser2Fav)
        .then(data => {
            setMoviesDataUser1WishVsUser2Fav(data)
        })
    }, [movieIDsUser1WishVsUser2Fav])
    
    // "Initialiserer" getMoviesdata() for bruker2 sin ønskeliste mot bruker1 sin favorittliste
    useEffect(() => {
        getMoviesData(movieIDsUser2WishVsUser1Fav)
        .then(data => {
            setMoviesDataUser2WishVsUser1Fav(data)
        })
    }, [movieIDsUser2WishVsUser1Fav])

    return (
        <section>
                <h2>Ønskeliste vs Favoritter</h2>
                <p>sjekk ut dette</p>
                <ul>
                     <li> 
                        <h3>Din ønskeliste vs {user2} sine favoritter</h3>
                    {moviesDataUser2WishVsUser1Fav?.map((movie, index) =>
                        <MovieCard key={index} movie={movie} className="mixedDash"/>
                    )}
                    </li>
                    <li> <h3>{user2} ønskeliste vs dine favoritter</h3>
                     {moviesDataUser1WishVsUser2Fav?.map((movie, index)=>
                       
                    <MovieCard key={index} movie={movie} className="mixedDash"/>
                        
                     )}
                     </li>
                </ul>
            </section>
    )
}