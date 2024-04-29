import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/login'
import NavBar from './components/NavBar'
import './App.css'
import login from './components/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route index element ={<Loginpage />}></Route>
        
      </Routes>
        
    </>
  )
}

export default App
