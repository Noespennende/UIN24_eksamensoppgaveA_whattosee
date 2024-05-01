import { Link } from "react-router-dom";
import { RxStar } from "react-icons/rx";
import { RxStarFilled } from "react-icons/rx";

export default function GenreCard({title, url, userGenres}){
    return(
        <article>
            <Link to={`/${url}/genre`}>{title}</Link>
            {(userGenres.includes(title)) ? (<button><RxStarFilled /> Favorittsjanger</button>) : (<button><RxStar /> Legg til favoritter</button>)}
        </article>
    )
}