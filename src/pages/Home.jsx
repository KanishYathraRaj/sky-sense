import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import WeatherCard from '../components/WeatherCard/WeatherCard';
import InsightCard from '../components/InsightCard/InsightCard';
import Map from '../components/Map/Map';
import { getWeather , getWeatherByCoordinates , getLocation , convertToDateTime} from '../util.js';

const Home = () => {

  const [coordinates, setCoordinates] = useState({latitude:null,longitude:null});
  const [data, setData] = useState(null);
  const [business, setBusiness] = useState("logistics and transportation");

  useEffect(() => {
    getLocation(setCoordinates);
  }, []);

  useEffect(() => {
    if(coordinates.latitude && coordinates.longitude){
      getWeatherByCoordinates(coordinates.latitude,coordinates.longitude,setData);
    }else{
      console.log("No coordinates");
    }
  }, [coordinates]);

  return (
    <>
    <div className="header-container">
      <Navbar />
    </div>

    <div className="home-container">
      <div className="card-section">
        <WeatherCard className="weather-card"
            main={data ? data.main : "--"}
            temp={data ? data.temp : "--"}
            feels_like={data ? data.feels_like : "--"}
            temp_min={data ? data.temp_min : "--"}
            temp_max={data ? data.temp_max : "--"}
            pressure={data ? data.pressure: "--"}
            humidity={data ? data.humidity: "--"}
            sealevel={data ? data.sealevel: "--"}
            grndlevel={data ? data.grndlevel: "--"}
            visibility={data ? data.visibility: "--"}
            wind_speed={data ? data.wind_speed: "--"}
            wind_deg={data ? data.wind_deg: "--"}
            clouds={data ? data.clouds: "--"}
            country={data ? data.country: "--"}
            city={data ? data.city: "--"}
            sunrise={data ? data.sunrise: "--"}
            sunset={data ? data.sunset: "--"}
            date={data ? convertToDateTime(data.date): "--"}
            icon={data ? `https://openweathermap.org/img/wn/${data.icon}@2x.png` : "--"}
        />

        <InsightCard className="insight-card"
          weatherData={data}
          business={business}
        />

      </div>
    </div>
    </>
  );
};

export default Home;
