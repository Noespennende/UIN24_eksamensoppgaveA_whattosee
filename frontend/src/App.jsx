import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/login'
import './App.css'
import Midlertidigdash from './components/midlertidigdash'
import Dashboard from './components/Dashboard'
import { useEffect, useState } from 'react'


function App() {
  const [loggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('LoggedInUser')
    if(loggedInUser)
      setIsLoggedIn(true)
  },[])

  //https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/ 29/4/24
  const handleLogin = (username) =>{
    localStorage.setItem('LoggedInUser',  JSON.stringify(username));
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    localStorage.removeItem('LoggedInUser');
    setIsLoggedIn(false);
  };
  return (
    <>
      <Routes>
        <Route index element ={<Loginpage onLogin={handleLogin}/>}></Route>
        <Route path='/Frontpage'/>
        <Route path='/Dashboard/:slug' element={<Dashboard/>}/>
        <Route path="/Dashboard/:slug" element={<Midlertidigdash onLogout={handleLogout} />} />
        <Route path='/genre'/>
        <Route path='/:slug/genre'/>
      </Routes>
    </>
  )
}

export default App
