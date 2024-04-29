import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/login'
import './App.css'
import Midlertidigdash from './components/midlertidigdash'

function App() {

  return (
    <>
      <Routes>
        <Route index element ={<Loginpage/>}></Route>
        <Route path='/Frontpage'/>
        <Route path='/Dashboard/:slug' element={<Midlertidigdash/>}/>
        <Route path='/genre'/>
        <Route path='/:slug/genre'/>
      </Routes>
    </>
  )
}

export default App
