

export default function Footer({loggedInUser}){ 
    return (
        <>
         {(loggedInUser) ?
         (
         <ul>
            <li>Gruppe 8 - Utvikling av interaktive nettsider 2024</li>
            <li><a href="https://www.flaticon.com/free-icons/popcorn" title="popcorn icons">Popcorn icons created by Freepik - Flaticon</a></li>
            <li><a href="https://www.flaticon.com/free-icons/unavailable" title="unavailable icons">Unavailable icons created by Shaharea - Flaticon</a></li>
        </ul>)
         :
         ("") }
        </>
    )

}