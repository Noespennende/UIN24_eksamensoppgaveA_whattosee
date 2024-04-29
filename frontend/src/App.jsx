import { Route, Routes } from 'react-router-dom'
import Loginpage from './components/login'
import './App.css'
import FrontPage from './components/FrontPage'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<Loginpage />}></Route>
        <Route path='/Frontpage/:slug' element={<FrontPage />} />
        <Route path='/Dashboard' />
        <Route path='/genre' />
        <Route path='/:slug/genre' />
      </Routes>
    </>
  )
}

export default App
