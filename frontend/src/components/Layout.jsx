import NavBar from "./NavBar";

export default function Layout({children}) {
    const loggedInUser = JSON.parse(localStorage.getItem('LoggedInUser'))

    return (
        <>
        <header>
            <NavBar LoggedInUser={loggedInUser}/>
        </header>
        <main>
            {children}
        </main>
        </>
    )
}