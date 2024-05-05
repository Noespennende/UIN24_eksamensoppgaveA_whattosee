import NavBar from "./NavBar";

export default function Layout({children, setLoggedIn, loggedInUser, setLoggedInUser}) {


    return (
        <>
        <header>
            <NavBar LoggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} setLoggedInn={setLoggedIn}/>
        </header>
        <main>
            {children}
        </main>
        </>
    )
}