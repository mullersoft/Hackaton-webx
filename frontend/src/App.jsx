// import { useState } from 'react'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import Payrolle from './components/payrolle'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
   <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Payrolle />} />
          </Routes>
          <Footer/>
        </div>
      </Router>
  )
}

export default App
