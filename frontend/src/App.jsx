import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/login'
import './App.css'
import FrontPage from './components/FrontPage'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Genre from './components/Genre'
import Genres from './components/Genres'


function App() {
  const [loggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('LoggedInUser')
    if (loggedInUser)
      setIsLoggedIn(true)
  }, [])

  //https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/ 29/4/24
  const handleLogin = (username) => {
    localStorage.setItem('LoggedInUser', JSON.stringify(username));
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    localStorage.removeItem('LoggedInUser');
    setIsLoggedIn(false);
  };
  return (
    <Layout>
      <Routes>
        <Route index element={<Loginpage onLogin={handleLogin} />}></Route>
        <Route path='/Frontpage/:slug' element={<FrontPage />} />
        <Route path='/Dashboard/:slug' element={<Dashboard />} /> {/* fjerne slug her når sammenligning av brukere i FrontPage er lagd?*/}

        <Route path='/genres' element={<Genres/>}/>
        <Route path='/:slug/genre' element={<Genre/>}/>
      </Routes>
    </Layout>
  )
}

export default App