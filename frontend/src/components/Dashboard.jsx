import { Link, useParams } from "react-router-dom";
import { fetchFavoriteGenreByUser, fetchFavoriteMoviesByUser, fetchWishlistMoviesByUser } from "../../sanity/services/userServices";
import { useEffect, useState } from "react";
import DashMovieCard from "./DashMovieCard"
import { fetchUsers } from "../../sanity/services/loginServices";
import { apiClient } from "../../imdbapi/apiClient";

export default function Dashboard( {onLogout}) {
    
    const {slug} = useParams()

    /* ** Logg ut / Innlogget bruker ** */
    const[users,setUsers] = useState([])
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'))

    const handlelogout =() =>{
        onLogout()
    }

    useEffect(() => {
        const fetchData = async () => {
            const allUsers = await fetchUsers();
            const usersFiltered = allUsers.filter(user => user.username !== loggedInUser)
            setUsers(usersFiltered)   
        }
        fetchData();
    }, [loggedInUser])

    /* ************************************************* */
    /* ** Felles filmer i ønskeliste VS favorittliste ** */
    /* ************************************************* */

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
        getCommonMoviesFromWishAndFav(loggedInUser, slug)   
    }, [slug])

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
        getCommonWishlistMovieIDsForUsers(loggedInUser, slug)
    }, [slug])

    // "Initialiserer" getMoviesData() for å hente alle filmer, og bruker "felles" listen
    useEffect(() => {
        getMoviesData(commonWishlistMovieIDs)
        .then(data => {
            setCommonWishlistMoviesData(data)
        })
    }, [commonWishlistMovieIDs])

    /* *************************** */
    /* ** Felles favorittfilmer ** */
    /* *************************** */

    const [commonFavoriteMovieIDs, setCommonFavoriteMovieIDs] = useState([])
    const [commonFavoriteMoviesData, setcommonFavoriteMoviesData] = useState([])

    // Sanity fetch -> setter commonFavoriteMovies -> alle filmer som to brukere har som favoritt
    const getCommonFavoriteMoviesForUsers = async (user1, user2) => {
        const user1FavoriteMovieIDs = await fetchFavoriteMoviesByUser(user1)
        const user2FavoriteMovieIDs = await fetchFavoriteMoviesByUser(user2)

        const commonFavoriteMovieIDs = []

        if (user1FavoriteMovieIDs.favoriteMovies && user2FavoriteMovieIDs.favoriteMovies) {
            for (const user1movie of user1FavoriteMovieIDs.favoriteMovies) {
                for (const user2movie of user2FavoriteMovieIDs.favoriteMovies) {
                    if (user1movie.imdbid === user2movie.imdbid) {
                        commonFavoriteMovieIDs.push(user1movie)
                        
                        break
                    }
                }
            }
        }

        setCommonFavoriteMovieIDs(commonFavoriteMovieIDs);
    }

    // "Initialiserer" getCommonFavoriteMoviesUsers()
    useEffect(() => {
        getCommonFavoriteMoviesForUsers(loggedInUser, slug)
    }, [slug])


    // "Initialiserer" getMoviesData() for å hente alle filmer, og bruker "felles favorittfilmer" listen
    useEffect(() => {
        getMoviesData(commonFavoriteMovieIDs)
        .then(data => {
            setcommonFavoriteMoviesData(data)
        })
    }, [commonFavoriteMovieIDs])


    /* **************************** */
    /* ** Felles favorittsjangre ** */
    /* **************************** */

    const [commonFavoriteGenres, setCommonFavoriteGenres] = useState([])

    // Sanity fetch -> setter commonFavoriteMovies -> alle filmer som to brukere har som favoritt
    const getCommonFavoriteGenresByUsers = async (user1, user2) => {
        const user1FavoriteGenres = (await fetchFavoriteGenreByUser(user1))[0].favorites
        //const user1FavoriteGenres = await fetchFavoriteGenresByUser(user1)
        const user2FavoriteGenres = (await fetchFavoriteGenreByUser(user2))[0].favorites
        //const user2FavoriteGenres = await fetchFavoriteGenresByUser(user2)

        console.log("user1 ", user1FavoriteGenres)
        const commonFavoriteGenres = []

        if (user1FavoriteGenres && user2FavoriteGenres) {
            // Prøvde sammenligne ._id, men da kom det en ikke-felles fra user1genre med i listen
            for (const user1genre of user1FavoriteGenres) { //of user1FavoriteGenres.favoriteGenres
                for (const user2genre of user2FavoriteGenres) { //og user2FavoriteGenres.favoriteGenres
                    if (user1genre === user2genre) { // user1genre.genretitle === user2genre.genretitle
                        commonFavoriteGenres.push(user1genre)
                        
                        break
                    }
                }
            }
        }

        setCommonFavoriteGenres(commonFavoriteGenres);
    }

    // "Initialiserer" getCommonFavoriteMoviesUsers()
    useEffect(() => {
        getCommonFavoriteGenresByUsers(loggedInUser, slug)
    }, [slug])


    /* ************** */
    /* ** API-kall ** */
    /* ************** */

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

    return(
        <section>
            {users.map((user, index) => (
            <h1 key={index}>Forslag til {user.username}</h1>))}
            <h3>Forslag for {loggedInUser} og {slug}</h3>
            <section>
                <h2>Catch up!</h2>
                {commonWishlistMovieIDs.length > 1 || commonWishlistMovieIDs.length == 0
                ? (<p>Dere har {commonWishlistMovieIDs.length} filmer felles i ønskelisten deres.</p>) 
                : <p>Dere har {commonWishlistMovieIDs.length} film felles i ønskelisten deres.</p>
                }
                {commonWishlistMoviesData?.map((movie, index) => 
                <DashMovieCard key={index} movie={movie} />)}
            </section>
            <section>
                <h2>Go safe!</h2>
                {commonFavoriteMoviesData.length > 1 || commonFavoriteMoviesData.length == 0
                ? (<p>Dere har {commonFavoriteMoviesData.length} filmer felles i favorittlisten deres.</p>) 
                : <p>Dere har {commonFavoriteMoviesData.length} film felles i favorittlisten deres.</p>
                }
                {commonFavoriteMoviesData?.map((movie, index) => 
                <DashMovieCard key={index} movie={movie} />)}
            </section>
            <section>
                <h2>Utforsk!</h2>
                <p>Dere liker begge disse sjangerne. Sjekk hvilke filmer som finnes å velge mellom:</p>
                <ul>
                    {commonFavoriteGenres?.map((genre, index) =>
                    <li key={index}><Link to={`/${genre.toLowerCase()}/genre`}>{genre}</Link></li> // genre.genreurl.current og {genre.genretitle}
                    )}
                </ul>
            </section>
            <section>
                <h2>felles i ønsk of fav</h2>
                <p>sjekk ut dette</p>
                <ul><li> <p>{slug} sine filmer</p>
                     {moviesDataUser1WishVsUser2Fav?.map((movie, index)=>
                       
                    <DashMovieCard key={index} movie={movie}/>
                        
                     )}
                     </li>
                     <li> 
                        <p>{loggedInUser} sine filmer</p>
                    {moviesDataUser2WishVsUser1Fav?.map((movie, index) =>
                        <DashMovieCard key={index} movie={movie}/>
                    )}
                    </li>
                </ul>
            </section>
        </section>
        
    )
}