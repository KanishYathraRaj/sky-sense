import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Api from '../api/api';
import { logout } from '../service/authService';
import './Home.css';

import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };


  // const [weatherData, setWeatherData] = useState(null);

  // useEffect(() => {
  //   // Define the URL for the GET request
  //   const url = "http://api.weatherapi.com/v1/forecast.json?key=18ee6cafd4ea4be290344156241910&q=Coimbatore&days=10&aqi=yes&alerts=yes";

  //   // Axios GET request
  //   axios.get(url)
  //     .then(response => {
  //       // Handle success
  //       setWeatherData(response.data);
  //       console.log(weatherData);
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error("Error fetching the weather data:", error);
  //     });
  // }, []);

  // const forecastData = weatherData?.forecast?.forecastday;

  return (
    <>
      <Navbar />
      <Api />

      {/* <div className='notificationCard'>
      {weatherData && (
          <div>
            <p>Weather Forecast</p>
            <p>{forecastData[0].day.condition.text}</p>
            <p>{forecastData[1].day.condition.text}</p>
            <p>{forecastData[2].day.condition.text}</p>
            <p>{forecastData[3].day.condition.text}</p>
            <p>{forecastData[4].day.condition.text}</p>
            <p>{forecastData[5].day.condition.text}</p>
            <p>{forecastData[6].day.condition.text}</p>
          </div>
        )}
      </div> */}

      {/* <Footer /> */}
  
    </>
  );
}

export default Home;
