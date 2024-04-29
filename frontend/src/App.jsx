import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/login'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element ={<Loginpage/>}></Route>
        <Route path='/Frontpage'/>
        <Route path='/Dashboard'/>
        <Route path='/genre'/>
        <Route path='/user/genre'/>
      </Routes>
        
    </>
  )
}

export default App
