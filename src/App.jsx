import { useState } from 'react';
import './App.css';
import { Login } from './Components/Login/Login';
import Landing from './Components/Landing/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Signup from './Components/Signup/Signup';
import Home from './Pages/Home';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>

      {/* <Route path='/about' element={<h1>Kanish nigga</h1>}/> */}
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
