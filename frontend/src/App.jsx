import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/login'
import './App.css'
import Midlertidigdash from './components/midlertidigdash'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route index element ={<Loginpage/>}></Route>
        <Route path='/Frontpage'/>
        <Route path='/Dashboard/:slug' element={<Dashboard/>}/>
        <Route path='/genre'/>
        <Route path='/:slug/genre'/>
      </Routes>
    </>
  )
}

export default App
