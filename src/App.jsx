import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Creators from './assets/Creators'
import Form from './assets/Form'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import CreatorPage from './assets/CreatorPage'
import UpdateForm from './assets/UpdateForm'

function App() {
  return (
   <div className='main'>
    <Router>
      <div className='nav'>
        <h1>Welcome to CreatorVerse!</h1>
        <div className='buttons'>
          <div><Link to='/creators'>View Creators</Link></div>
          <div><Link to='/form'>Add Creators</Link></div>
        </div>
      </div>
      <div className='creators'>
        <Routes>
          <Route path='/'></Route>
          <Route path='/creators' element={<Creators></Creators>}></Route>
          <Route path='/form' element={<Form></Form>}></Route>
          <Route path='/creator/:id' element={<CreatorPage></CreatorPage>}></Route>
          <Route path="/creator/update/:id" element={<UpdateForm />} />
        </Routes>
      </div>
    </Router>
   </div>
  )
}

export default App
