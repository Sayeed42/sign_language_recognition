import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Home from './Home/Home'
import App2 from './App2'

import './App.css'

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/start' element={<App2 />} />
      </Routes>
    </Router>
  )
}


