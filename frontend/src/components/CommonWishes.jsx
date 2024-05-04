import { useEffect, useState } from "react"
import { getMoviesData } from "../../imdbapi/apiServices"
import { fetchWishlistMoviesByUser } from "../../sanity/services/userServices"
import DashMovieCard from "./DashMovieCard"
import MovieCard from "./MovieCard"

export default function CommonWishes({user1, user2}) {

    /* *********************** */
    /* ** Felles ønskeliste ** */
    /* *********************** */

    const [commonWishlistMovieIDs, setCommonWishlistMovieIDs] = useState([])
    const [commonWishlistMoviesData, setCommonWishlistMoviesData] = useState([])

    // Sanity fetch -> setter commonWishlist -> alle filmer som to brukere har til felles
    const getCommonWishlistMovieIDsForUsers = async (user1, user2) => {
        const user1Wishlist = await fetchWishlistMoviesByUser(user1)
        const user2Wishlist = await fetchWishlistMoviesByUser(user2)

        const commonWishlistMovieIDs = []

        if (user1Wishlist.wishlist && user2Wishlist.wishlist) {
            for (const user1movie of user1Wishlist.wishlist) {
                for (const user2movie of user2Wishlist.wishlist) {
                    if (user1movie.imdbid === user2movie.imdbid) {
                        commonWishlistMovieIDs.push(user1movie)
                        break
                    }
                }
            }
        }

        setCommonWishlistMovieIDs(commonWishlistMovieIDs);
    
    }

    // "Initialiserer" getCommonWishlistMovieIDsForUsers()
    useEffect(() => {
        getCommonWishlistMovieIDsForUsers(user1, user2)
    }, [user2])

    // "Initialiserer" getMoviesData() for å hente alle filmer, og bruker "felles" listen
    useEffect(() => {
        getMoviesData(commonWishlistMovieIDs)
        .then(data => {
            setCommonWishlistMoviesData(data)
        })
    }, [commonWishlistMovieIDs])

    return (
        <section>
                <h2>Catch up!</h2>
                {commonWishlistMovieIDs.length > 1 || commonWishlistMovieIDs.length == 0
                ? (<p>Dere har {commonWishlistMovieIDs.length} filmer felles i ønskelisten deres.</p>) 
                : <p>Dere har {commonWishlistMovieIDs.length} film felles i ønskelisten deres.</p>
                }
                <ul id="catchupList">
                        {commonWishlistMoviesData?.map((movie, index) =>
                        <li key={"catchup"+index}><MovieCard movie={movie} className="wishlistDash"/></li>)}
                </ul>
            </section>
    )
}