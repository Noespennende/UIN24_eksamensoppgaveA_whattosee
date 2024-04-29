import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/Login'
import './App.css'
import Midlertidigdash from './components/Midlertidigdash'
import Genre from './components/Genre'
import { useEffect } from 'react'
import Genres from './components/Genres'

function App() {


  return (
    <>
      <Routes>
        <Route index element ={<Loginpage/>}></Route>
        <Route path='/Frontpage'/>
        <Route path='/Dashboard/:slug' element={<Midlertidigdash/>}/>
        <Route path='/genre/:slug' element={<Genre/>}/>
        <Route path='/genres/:slug' element={<Genres/>}/>
        <Route path='/:slug/genre'/>
      </Routes>
    </>
  )
}

export default App
