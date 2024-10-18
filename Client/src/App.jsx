import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup'
import Newpassword from './Components/Newpassword'
import Welcome from './Pages/Welcome'


const routes=(
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home/>}/>
      <Route path='/' exact element={<Welcome/>}/>
      <Route path='/login' exact element={<Login/>}/>
      <Route path='/signup' exact element={<Signup/>}/>
      <Route path='/newpassword/:token' exact element={<Newpassword/>}/>
    </Routes>
  </Router>
)

function App() {
  return (
    <div >
      {routes}
    </div>
  )
}

export default App
