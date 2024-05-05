import { useParams } from "react-router-dom";
import CommonWishes from "./CommonWishes";
import CommonFavories from "./CommonFavorites";
import CommonGenres from "./CommonGenres";
import CommonWishVsFav from "./CommonWishVsFav";

export default function Dashboard() {
    
    const {slug} = useParams()
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'))

    return(
        <section>
            <h1>Forslag for {loggedInUser} og {slug}</h1>
            <CommonWishes user1={loggedInUser} user2={slug}/>
            <CommonFavories user1={loggedInUser} user2={slug}/>
            <CommonGenres user1={loggedInUser} user2={slug}/>
            <CommonWishVsFav user1={loggedInUser} user2={slug}/>
        </section>
        
    )
}