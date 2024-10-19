import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh, faTint, faWind, faCloud, faUmbrella, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const Api = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch weather data by city
  const fetchWeatherDataByCity = async (city) => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/city/${city}/EN`,
      headers: {
        'x-rapidapi-key': '403d03e400msh86e35cea7b563d8p1762bdjsn83bdab8c01f0',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data by city .');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch weather data by latitude and longitude
  const fetchWeatherDataByLocation = async (lat, lon) => {
    setLoading(true);
    setError(null);

    const options = {
      method: 'GET',
      url: `https://open-weather13.p.rapidapi.com/weather/latlon/${lat}/${lon}/EN`,
      headers: {
        'x-rapidapi-key': '403d03e400msh86e35cea7b563d8p1762bdjsn83bdab8c01f0',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data by location.');
    } finally {
      setLoading(false);
    }
  };

  const fahrenheitToCelsius = (tempF) => {
    return ((tempF - 32) * 5) / 9;
  };

  const mphToKph = (speedMph) => {
    return speedMph * 1.60934;
  };

  // Use the Geolocation API to get the user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByLocation(latitude, longitude);
        },
        (error) => {
          setError('Unable to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '20px',
      backgroundColor: '#282c34',
      color: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '300px',
      marginLeft: '8px', // Space between icon and input
    },
    button: {
      padding: '10px 15px',
      fontSize: '16px',
      color: '#ffffff',
      backgroundColor: '#61dafb',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonDisabled: {
      padding: '10px 15px',
      fontSize: '16px',
      color: '#ccc',
      backgroundColor: '#444',
      border: 'none',
      borderRadius: '4px',
      cursor: 'not-allowed',
    },
    weatherCard: {
      marginTop: '20px',
      padding: '20px',
      backgroundColor: '#3c4043',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      textAlign: 'left',
      width: '300px',
      transition: 'transform 0.2s',
    },
    loading: {
      color: '#61dafb',
    },
    error: {
      color: 'red',
    },
    icon: {
      color: '#61dafb', // Icon color
      fontSize: '20px', // Icon size
    },
    p: {
      margin: 0,
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#61dafb',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <FontAwesomeIcon icon={faLocationArrow} style={styles.icon} />
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
      </div>
      <button 
        onClick={() => fetchWeatherDataByCity(city)} 
        disabled={!city} 
        style={!city ? styles.buttonDisabled : styles.button}
      >
        Get Weather
      </button>

      <div style={styles.weatherCard}>
        <h2>Weather in {city || '--'}</h2>
        {loading && <p style={styles.loading}>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!weatherData ? (
          <div style={styles.p}>
            <p> <FontAwesomeIcon icon={faTemperatureHigh} style={styles.icon} /> Temperature: -- °C</p>
            <p> <FontAwesomeIcon icon={faTint} style={styles.icon} /> Humidity: --%</p>
            <p> <FontAwesomeIcon icon={faWind} style={styles.icon} /> Wind Speed: -- km/h</p>
            <p> <FontAwesomeIcon icon={faUmbrella} style={styles.icon} /> Precipitation: -- mm</p>
            <p> <FontAwesomeIcon icon={faCloud} style={styles.icon} /> Weather: --</p>
            <p>Pressure: -- hPa</p>
            <p>Wind Direction: --°</p>
            <p>Cloudiness: --%</p>
            <p>Country: --</p>
            <p>Min Temperature: -- °C</p>
            <p>Max Temperature: -- °C</p>
          </div>
        ) : (
          <>
            <p><FontAwesomeIcon icon={faTemperatureHigh} style={styles.icon} />Temperature: {fahrenheitToCelsius(weatherData.main.temp).toFixed(2)} °C</p>
            <p><FontAwesomeIcon icon={faTint} style={styles.icon} />Humidity: {weatherData.main.humidity}%</p>
            <p><FontAwesomeIcon icon={faWind} style={styles.icon} />Wind Speed: {mphToKph(weatherData.wind.speed).toFixed(2)} km/h</p>
            <p><FontAwesomeIcon icon={faUmbrella} style={styles.icon} />Precipitation: {weatherData.rain ? weatherData.rain['1h'] : weatherData.snow ? weatherData.snow['1h'] : 0} mm</p>
            <p><FontAwesomeIcon icon={faCloud} style={styles.icon} />Weather: {weatherData.weather[0].description}</p>
            {weatherData.main.pressure && <p><FontAwesomeIcon icon={faCloud} style={styles.icon} />Pressure: {weatherData.main.pressure} hPa</p>}
            {weatherData.wind.deg && <p><FontAwesomeIcon icon={faCloud} style={styles.icon} />Wind Direction: {weatherData.wind.deg}°</p>}
            {weatherData.clouds && <p><FontAwesomeIcon icon={faCloud} style={styles.icon} />Cloudiness: {weatherData.clouds.all}%</p>}
            {weatherData.sys.country && <p><FontAwesomeIcon icon={faCloud} style={styles.icon} />Country: {weatherData.sys.country}</p>}
            {weatherData.main.temp_min && <p><FontAwesomeIcon icon={faTemperatureHigh} style={styles.icon} />Min Temperature: {fahrenheitToCelsius(weatherData.main.temp_min).toFixed(2)} °C</p>}
            {weatherData.main.temp_max && <p><FontAwesomeIcon icon={faTemperatureHigh} style={styles.icon} />Max Temperature: {fahrenheitToCelsius(weatherData.main.temp_max).toFixed(2)} °C</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Api;
