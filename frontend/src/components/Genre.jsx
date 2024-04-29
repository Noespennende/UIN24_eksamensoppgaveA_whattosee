import Moviecard from "./Moviecard"
import { useState } from "react"


export default function Genre(){
    const [genreList, setGenreList] = useState()

    

    return(
        <main>
            <h1>Sjanger: Sjangernavn (x filmer)</h1>
            <Moviecard/>
        </main>
    )

}