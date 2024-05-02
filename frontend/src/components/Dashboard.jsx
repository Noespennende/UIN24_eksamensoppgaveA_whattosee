import { Link, useParams } from "react-router-dom";
import { fetchFavoriteGenresByUser, fetchFavoriteMoviesByUser, fetchWishlistMoviesByUser } from "../../sanity/services/userServices";
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

    const [moviesInWishAndFav, setMoviesInWishAndFav] = useState([])
    const [commonData, setCommonData] = useState([])
    const [person, setPerson] = useState([])
    const [commonDat, setCommonDat] = useState([])
    
    useEffect(() => {
        getMoviesData(moviesInWishAndFav)
        .then(data => {
            setCommonData(data)
            //console.log("test", data)
            //console.log("halloo", moviesInWishAndFav);
        })
    }, [moviesInWishAndFav])
    

    useEffect(() => {
        getMoviesData(person)
        .then(data => {
            setCommonDat(data)
            //console.log("test", data)
            console.log("halloo kommondatt", person);
        })
    }, [person])

    const getCommonMoviesFromWishAndFav = async (user1, user2) => {
        const user1Wish = await fetchWishlistMoviesByUser(user1)
        const user2Fav = await fetchFavoriteMoviesByUser(user2)
        const user1Fav = await fetchFavoriteMoviesByUser(user1)
        const user2Wish = await fetchWishlistMoviesByUser(user2)

        const imdbList = []
        const personList = []

        for(const user1movie of user1Wish.wishlist){
            for(const user2movie of user2Fav.favoriteMovies){
                //console.log("user1 ", user1movie.imdbid)
                //console.log("user2 ", user2movie.imdbid)
                if(user1movie.imdbid === user2movie.imdbid){
                    personList.push(user1movie)
                    console.log("hei jeg heter nr 1: ", user2)
                    break
                }
                
            }
        }
        for(const user1movieFav of user1Fav.favoriteMovies){
            for(const user2movieWish of user2Wish.wishlist){
                //console.log("user1fav: ", user1movieFav.imdbid)
                //console.log("user2wish: ", user2movieWish.imdbid)           
                if(user1movieFav.imdbid === user2movieWish.imdbid){
                   console.log("jeg heter: ", user1)
                    imdbList.push(user1movieFav)
                    
                    
                    break
                }
            }
        }
        setMoviesInWishAndFav(imdbList)
        setPerson(personList)
        moviesInWishAndFav.map(movie => {
            console.log("test imdblist", movie)
        })

        personList.map((movie) => {
            console.log("test personlist ", movie)
        })
    }

    useEffect(() =>{
        getCommonMoviesFromWishAndFav(loggedInUser, slug)
        
    }, [slug])
 
    

    /* *********************** */
    /* ** Felles ønskeliste ** */
    /* *********************** */

    const [commonWishlist, setCommonWishlist] = useState([])
    const [commonWishlistData, setCommonWishlistData] = useState([])

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
        getCommonWishlistMoviesForUsers(loggedInUser, slug)
    }, [slug])


    
    // Tar i bruk funksjonen getMoviesData() for å hente alle filmer, og bruker "felles" listen
    useEffect(() => {
        getMoviesData(commonWishlist)
        .then(data => {
            setCommonWishlistData(data)
            //console.log("test", data)
            //console.log("halloo", commonWishlistData);
        })
    }, [commonWishlist])

    /* *************************** */
    /* ** Felles favorittfilmer ** */
    /* *************************** */

    const [commonFavoriteMovies, setCommonFavoriteMovies] = useState([])
    const [commonFavoriteMoviesData, setcommonFavoriteMoviesData] = useState([])

    // Sanity fetch -> setter commonFavoriteMovies -> alle filmer som to brukere har som favoritt
    const getCommonFavoriteMoviesForUsers = async (user1, user2) => {
        const user1FavoriteMovies = await fetchFavoriteMoviesByUser(user1)
        const user2FavoriteMovies = await fetchFavoriteMoviesByUser(user2)

        const commonFavoriteMoviesData = []

        for (const user1movie of user1FavoriteMovies.favoriteMovies) {
            for (const user2movie of user2FavoriteMovies.favoriteMovies) {
                if (user1movie.imdbid === user2movie.imdbid) {
                    commonFavoriteMoviesData.push(user1movie)
                    
                    break
                }
            }
        }
        setCommonFavoriteMovies(commonFavoriteMoviesData);
    }

    // Tar i bruk metoden getCommonFavoriteMoviesUsers()
    useEffect(() => {
        getCommonFavoriteMoviesForUsers(loggedInUser, slug)
    }, [slug])


    // Tar i bruk funksjonen getMoviesData() for å hente alle filmer, og bruker "felles favorittfilmer" listen
    useEffect(() => {
        getMoviesData(commonFavoriteMovies)
        .then(data => {
            setcommonFavoriteMoviesData(data)
            //console.log("Felles favoritter: ", commonFavoriteMovies)
        })
    }, [commonFavoriteMovies])

    /* **************************** */
    /* ** Felles favorittsjangre ** */
    /* **************************** */

    const [commonFavoriteGenres, setCommonFavoriteGenres] = useState([])

    // Sanity fetch -> setter commonFavoriteMovies -> alle filmer som to brukere har som favoritt
    const getCommonFavoriteGenresByUsers = async (user1, user2) => {
        const user1FavoriteGenres = await fetchFavoriteGenresByUser(user1)
        const user2FavoriteGenres = await fetchFavoriteGenresByUser(user2)

        const commonFavoriteGenres = []

        // Prøvde sammenligne ._id, men da kom det en ikke-felles fra user1genre med i listen
        for (const user1genre of user1FavoriteGenres.favoriteGenres) {
            for (const user2genre of user2FavoriteGenres.favoriteGenres) {
                if (user1genre.genretitle === user2genre.genretitle) {
                    commonFavoriteGenres.push(user1genre)
                    
                    break
                }
            }
        }

        setCommonFavoriteGenres(commonFavoriteGenres);
        //console.log("User1genre: ", user1FavoriteGenres)
        //console.log("User2genre: ", user2FavoriteGenres)
        //console.log("Genres :", commonFavoriteGenres)
    }

    // Tar i bruk metoden getCommonFavoriteMoviesUsers()
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
    
    //console.log(commonFavoriteMoviesData)

    return(
        <section>
            {users.map((user, index) => (
            <h1 key={index}>Forslag til {user.username}</h1>))}
            <h3>Forslag for {loggedInUser} og {slug}</h3>
            <section>
                <h2>Catch up!</h2>
                {commonWishlist.length > 1 
                ? (<p>Dere har {commonWishlist.length} filmer felles i ønskelisten deres.</p>) 
                : <p>Dere har {commonWishlist.length} film felles i ønskelisten deres.</p>
                }
                {commonWishlistData?.map((movie, index) => 
                <DashMovieCard key={index} movie={movie} />)}
            </section>
            <section>
                <h2>Go safe!</h2>
                {commonFavoriteMoviesData.length > 1 
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
                    <li key={index}>{genre.genretitle}</li>
                    )}
                </ul>
            </section>
            <section>
                <h2>felles i ønsk of fav</h2>
                <p>sjekk ut dette</p>
                <ul><li> <p>{slug} sine filmer</p>
                     {commonData?.map((movie, index)=>
                       
                    <DashMovieCard key={index} movie={movie}/>
                        
                     )}
                     </li>
                     <li> 
                        <p>{loggedInUser} sine filmer</p>
                    {commonDat?.map((movie, index) =>
                        <DashMovieCard key={index} movie={movie}/>
                    )}
                    </li>
                </ul>
            </section>
            
            <Link to="/"><button onClick={handlelogout}>logout</button></Link>
            <h2>hællæ på dæ {loggedInUser}</h2>
        </section>
        
    )
}