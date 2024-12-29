import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ location, date, icon, temp, condition, humidity, wind }) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="location">{location}</h2>
        <p className="date">{date}</p>
      </div>
      <div className="weather-body">
        <img src={icon} alt="Weather Icon" className="weather-icon" />
        <div className="temperature">
          <span className="temp-value">{temp}</span><sup>°C</sup>
        </div>
        <p className="weather-condition">{condition}</p>
      </div>
      <div className="weather-footer">
        <p>Humidity: <span className="humidity">{humidity}%</span></p>
        <p>Wind: <span className="wind-speed">{wind} km/h</span></p>
      </div>
    </div>
  );
};

export default WeatherCard;
