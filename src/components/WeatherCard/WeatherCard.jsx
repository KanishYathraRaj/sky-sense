import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({
  main,
  temp,
  feels_like,
  temp_min,
  temp_max,
  pressure,
  humidity,
  sealevel,
  grndlevel,
  visibility,
  wind_speed,
  wind_deg,
  clouds,
  country,
  city,
  sunrise,
  sunset,
  date,
  icon,
}) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="location">{`${city}, ${country}`}</h2>
        <p className="date">{date}</p>
      </div>
      <div className="weather-body">
        <img src={icon} alt="Weather Icon" className="weather-icon" />
        <div className="temperature">
          <span className="temp-value">{temp}</span>
          <sup>°C</sup>
        </div>
        <p className="weather-condition">{main}</p>
      </div>
      <div className="weather-footer">
        <div className="details">
          <p><strong>Feels Like:</strong> <span>{feels_like}°C</span></p>
          <p><strong>Min Temp:</strong> <span>{temp_min}°C</span> | <strong>Max Temp:</strong> <span>{temp_max}°C</span></p>
          <p><strong>Pressure:</strong> <span>{pressure} hPa</span></p>
          <p><strong>Humidity:</strong> <span>{humidity}%</span></p>
          <p><strong>Sea Level:</strong> <span>{sealevel} hPa</span></p>
          <p><strong>Visibility:</strong> <span>{visibility / 1000} km</span></p>
          <p><strong>Wind:</strong> <span>{wind_speed} km/h</span> at <span>{wind_deg}°</span></p>
          <p><strong>Cloudiness:</strong> <span>{clouds}%</span></p>
          <p><strong>Sunrise:</strong> <span>{new Date(sunrise * 1000).toLocaleTimeString()}</span></p>
          <p><strong>Sunset:</strong> <span>{new Date(sunset * 1000).toLocaleTimeString()}</span></p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
