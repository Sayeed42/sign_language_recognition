import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './pages/Home/Home'
import Sign from './pages/Sign/Sign'
import About from './pages/About/About'
import Tutorials from './pages/Tutorials/Tutorials'

import './App.css'

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/start' element={<Sign />} />
        <Route path='/about' element={<About />} />
        <Route path='/tutorials' element={<Tutorials />} />
      </Routes>
    </Router>
  )
}


