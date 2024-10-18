import React from 'react'
import { logout } from '../service/authService'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Home() {
    const navi = useNavigate();
  return (
    <>
    <Link to={"/"}><button onClick={() => {logout();navi("/")}}>logout</button></Link>
    </>
  )
}

export default Home