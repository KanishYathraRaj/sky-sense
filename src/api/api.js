
import React, { useState } from 'react';
import axios from 'axios';

const Api = () => {
  const [city, setCity] = useState(''); // State for city input
  const [weatherData, setWeatherData] = useState(null); // State for storing weather data
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/city/${city}/EN`, // Use backticks for template literal
      headers: {
        'x-rapidapi-key': 'aef6e8eff6msh6b54ecfbff903eep1541eejsnd9867783e28c', // Your API key
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com', // API host
      },
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data); // Set weather data in state
    } catch (err) {
      setError('Failed to fetch weather data.'); // Handle error
    } finally {
      setLoading(false); // Set loading to false after request
    }
  };

  // Function to convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (tempF) => {
    return ((tempF - 32) * 5) / 9;
  };

  // Function to convert miles per hour to kilometers per hour
  const mphToKph = (speedMph) => {
    return speedMph * 1.60934;
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Update city state on input change
      />
      <button onClick={fetchWeatherData} disabled={!city}>
        Get Weather
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {fahrenheitToCelsius(weatherData.main.temp).toFixed(2)} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {mphToKph(weatherData.wind.speed).toFixed(2)} km/h</p>
          <p>Precipitation: {weatherData.main.precipitation ? weatherData.main.precipitation : 0} mm</p> {/* Assuming precipitation is in the response */}
          <p>Weather: {weatherData.weather[0].description}</p>

          {/* Display additional weather data if available */}
          {weatherData.main.pressure && <p>Pressure: {weatherData.main.pressure} hPa</p>}
          {weatherData.wind.deg && <p>Wind Direction: {weatherData.wind.deg}°</p>}
          {weatherData.clouds && <p>Cloudiness: {weatherData.clouds.all}%</p>}
          {weatherData.sys.country && <p>Country: {weatherData.sys.country}</p>}
          {weatherData.main.temp_min && <p>Min Temperature: {fahrenheitToCelsius(weatherData.main.temp_min).toFixed(2)} °C</p>}
          {weatherData.main.temp_max && <p>Max Temperature: {fahrenheitToCelsius(weatherData.main.temp_max).toFixed(2)} °C</p>}
        </div>
      )}
    </div>
  );
};

export default Api;

