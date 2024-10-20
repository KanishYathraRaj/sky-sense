import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Athens'); // Default city
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContainer darkMode={darkMode}>
      <Header>
        <SearchBar>
          <input
            type="text"
            placeholder="Search for your preferred city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={() => fetchWeatherData(city)}>Search</button>
        </SearchBar>
        <ToggleSwitch onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </ToggleSwitch>
      </Header>

      <MainWeatherDisplay>
        {weatherData && (
          <>
            <City>{weatherData.name}</City>
            <Temperature>{weatherData.main.temp}°C</Temperature>
            <WeatherDetails>
              <Detail>Humidity: {weatherData.main.humidity}%</Detail>
              <Detail>Wind: {weatherData.wind.speed} km/h</Detail>
              <Detail>Pressure: {weatherData.main.pressure} hPa</Detail>
            </WeatherDetails>
          </>
        )}
      </MainWeatherDisplay>

      <ForecastSection>
        <h3>5 Days Forecast:</h3>
        {/* Implement 5-Day Forecast */}
      </ForecastSection>

      <HourlyForecast>
        <h3>Hourly Forecast:</h3>
        {/* Implement Hourly Forecast */}
      </HourlyForecast>
    </AppContainer>
  );
};

export default WeatherApp;
