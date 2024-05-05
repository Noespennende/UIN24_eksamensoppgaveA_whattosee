

export default function Footer({loggedInUser}){ 
    return (
        <>
         {(loggedInUser) ? (<p>Gruppe 8 - Utvikling av interaktive nettsider 2024</p>) : ("") }
        </>
    )

}