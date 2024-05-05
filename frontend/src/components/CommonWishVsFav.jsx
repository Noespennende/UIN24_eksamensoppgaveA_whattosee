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

        // User 1 sin kolleksjon av "mitt ønske og andres favoritt"
        if (user1Wish.wishlist && user2Fav.favoriteMovies) {
            for(const user1MovieWish of user1Wish.wishlist){
                for(const user2movie of user2Fav.favoriteMovies){
                    if(user1MovieWish.imdbid === user2movie.imdbid){
                         // Vi har funnet en film som user1 har i sin ønskeliste, og user2 har i sin favorittliste

                        // Har user1 filmen i sin egen favorittliste også? hvis ikke...
                        if(!user1Fav.favoriteMovies.some(movie => movie.imdbid === user1MovieWish.imdbid)) {
                            // Har user2 filmen i sin ønskeliste også? Hvis ikke ...
                            if(!user2Wish.wishlist.some(movie => movie.imdbid === user1MovieWish.imdbid)) {

                                // Legger til filmen i user1 sin "min ønskeliste som er i andre bruker sin favorittliste"-liste
                                user1WishMovieIDs.push(user1MovieWish)
                                break
                            } 
                        }
                    } 
                }
            }
        }

        // User 2 sin kolleksjon av "mitt ønske og andres favoritt"
        if (user2Wish.wishlist && user1Fav.favoriteMovies) {
            for(const user2MovieWish of user2Wish?.wishlist){
                for(const user1MovieFav of user1Fav?.favoriteMovies){           
                    if(user2MovieWish.imdbid === user1MovieFav.imdbid){
                        // Vi har funnet en film som user2 har i sin ønskeliste, og user1 har i sin favorittliste
                        
                         // Har user2 filmen i sin egen favorittliste også? hvis ikke...
                         if(!user2Fav.favoriteMovies.some(movie => movie.imdbid === user2MovieWish.imdbid)) {
                            // Har user1 filmen i sin ønskeliste også? Hvis ikke ... 
                            if(!user1Wish.wishlist.some(movie => movie.imdbid === user2MovieWish.imdbid)) {
                                // Legger til filmen i user2 sin "min ønskeliste som er i andre bruker sin favorittliste"-liste
                                user2WishMovieIDs.push(user2MovieWish)
                                break
                            }  
                        }
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
                <section>
                    <h3>Din ønskeliste vs {user2} sine favoritter</h3>
                    <ul id="wishvsfav1">
                        {moviesDataUser1WishVsUser2Fav?.map((movie, index) =>
                        <li key={"wishvsfav1"+index}><MovieCard movie={movie} className="mixedDash"/></li>
                        )}
                    </ul>
                </section>
                <section>
                    <h3>{user2} ønskeliste vs dine favoritter</h3>
                    <ul id="wishvsfav2">
                        {moviesDataUser2WishVsUser1Fav?.map((movie, index)=>
                        
                        <li key={"wishvsfav2"+index}><MovieCard movie={movie} className="mixedDash"/></li>
                            
                        )}
                    </ul>
                </section>
        </section>
    )
}