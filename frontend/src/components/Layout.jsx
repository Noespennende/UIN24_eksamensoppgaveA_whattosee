import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({children, setLoggedIn, loggedInUser, setLoggedInUser}) {


    return (
        <>
        <header>
            <NavBar LoggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} setLoggedInn={setLoggedIn}/>
        </header>
        <main>
            {children}
        </main>
        <footer>
            <Footer loggedInUser={loggedInUser}/>
        </footer>
        </>
    )
}