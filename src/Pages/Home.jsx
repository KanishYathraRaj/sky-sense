import React from 'react';
import { logout } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Api from '../api/api';
function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <Api />

      {/* <Footer /> */}
  
    </>
  );
}

export default Home;
