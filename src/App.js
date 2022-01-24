import React from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import './style.css'

function App() {
  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <Link to='/' style={{marginRight: '20px'}}>Home</Link>
        <Link to='/post'>Add a Post</Link>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/post' element={<CreatePost />} />
      </Routes>
    </div>
  )
}

export default App
