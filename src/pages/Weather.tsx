import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, AlertTriangle, BarChart3, Thermometer, Calendar } from 'lucide-react';
import {
  getLocation,
  getWeatherByCoordinates,
  convertToDateTime,
  convertToDate,
  getInsight,
  getWeatherAlerts,
  getForecast
} from '../services/weatherService';
import { WeatherData, Coordinates, ForecastData } from '../types';
import { WeatherMap } from '../components/WeatherMap';
import { useSettings } from '../contexts/SettingsContext';

export function Weather() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { units } = useSettings();

  useEffect(() => {
    setLoading(true);
    getLocation(setCoordinates);
  }, []);

  useEffect(() => {
    if (coordinates) {
      getWeatherByCoordinates(coordinates.latitude, coordinates.longitude, (data) => {
        setWeatherData(data);
        if (data) {
          getInsight(data, setInsights, 'retail');
        }
        setLoading(false);
      });
      
      getWeatherAlerts(coordinates.latitude, coordinates.longitude)
        .then(alertData => setAlerts(alertData))
        .catch(err => {
          console.error("Error fetching alerts:", err);
          setAlerts([]);
        });
      
      getForecast(coordinates.latitude, coordinates.longitude)
        .then(forecast => setForecastData(forecast))
        .catch(err => {
          console.error("Error fetching forecast:", err);
          setForecastData([]);
        });
    }
  }, [coordinates]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-[var(--text-secondary)] flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)] mb-4"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-red-500 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[var(--accent)] text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-[var(--text-secondary)] text-center">
          <p>No weather data available</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-[var(--accent)] text-white rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const getTemperature = (celsius: number) => {
    return units === 'metric' ? celsius : (celsius * 9/5) + 32;
  };

  const formatTemperature = (temp: number) => {
    return `${Math.round(temp)}°${units === 'metric' ? 'C' : 'F'}`;
  };

  const getWeatherIcon = () => {
    const condition = weatherData.main.toLowerCase();
    if (condition.includes('clear')) return Sun;
    if (condition.includes('cloud')) return Cloud;
    if (condition.includes('rain') || condition.includes('drizzle')) return CloudRain;
    if (condition.includes('snow')) return Droplets;
    return Thermometer;
  };

  const WeatherIcon = getWeatherIcon();

  return (
    <div className="px-4 pb-24">
      {/* Current Weather */}
      <div className="card mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{formatTemperature(getTemperature(weatherData.temp))}</h2>
            <p className="text-[var(--text-secondary)] capitalize">{weatherData.description || weatherData.main}</p>
          </div>
          <img 
            src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
            alt={weatherData.main}
            className="h-16 w-16"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-[var(--text-secondary)]" />
            <span>{Math.round(weatherData.wind_speed * 2.237)} mph</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-[var(--text-secondary)]" />
            <span>{weatherData.humidity}%</span>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="overflow-x-auto pb-4 mb-6">
        <div className="flex gap-4">
          {forecastData.slice(0, 5).map((day, index) => (
            <div key={index} className="card min-w-[140px] text-center">
              <p className="font-medium mb-2">{convertToDate(day.date)}</p>
              <img 
                src={`https://openweathermap.org/img/wn/${day.icon}.png`}
                alt={day.weather}
                className="h-10 w-10 mx-auto"
              />
              <p className="text-lg font-semibold">{formatTemperature(getTemperature(day.temp))}</p>
              <p className="text-xs text-[var(--text-secondary)] capitalize">{day.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <h2 className="text-lg font-semibold">Weather Alerts</h2>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">{alert}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Map */}
      <div className="card mb-6">
        <WeatherMap coordinates={coordinates} />
      </div>

      {/* Details */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Weather Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-[var(--bg-primary)] rounded-lg">
            <p className="text-sm text-[var(--text-secondary)]">Feels Like</p>
            <p className="text-lg font-semibold">{formatTemperature(getTemperature(weatherData.feels_like))}</p>
          </div>
          <div className="p-3 bg-[var(--bg-primary)] rounded-lg">
            <p className="text-sm text-[var(--text-secondary)]">Visibility</p>
            <p className="text-lg font-semibold">{(weatherData.visibility / 1000).toFixed(1)} km</p>
          </div>
          <div className="p-3 bg-[var(--bg-primary)] rounded-lg">
            <p className="text-sm text-[var(--text-secondary)]">Sunrise</p>
            <p className="text-lg font-semibold">{convertToDateTime(weatherData.sunrise)}</p>
          </div>
          <div className="p-3 bg-[var(--bg-primary)] rounded-lg">
            <p className="text-sm text-[var(--text-secondary)]">Sunset</p>
            <p className="text-lg font-semibold">{convertToDateTime(weatherData.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}