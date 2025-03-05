import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Coordinates, WeatherData } from '../types';
import { getWeatherByCoordinates } from '../services/weatherService';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

interface WeatherMapProps {
  coordinates: Coordinates | null;
}

export function WeatherMap({ coordinates }: WeatherMapProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const defaultCenter: [number, number] = [40.7128, -74.0060]; // New York
  const center: [number, number] = coordinates 
    ? [coordinates.latitude, coordinates.longitude]
    : defaultCenter;

  useEffect(() => {
    setLoading(true);
    if (coordinates) {
      getWeatherByCoordinates(coordinates.latitude, coordinates.longitude, (data) => {
        setWeatherData(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [coordinates]);

  const celsiusToFahrenheit = (celsius: number) => Math.round((celsius * 9/5) + 32);

  return (
    <div className="card overflow-hidden">
      <h2 className="text-xl font-semibold mb-4">Weather Map</h2>
      {loading ? (
        <div className="h-[400px] rounded-lg overflow-hidden flex items-center justify-center bg-[var(--bg-primary)]">
          <div className="text-[var(--text-secondary)] flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--accent)] mb-2"></div>
            <p>Loading map data...</p>
          </div>
        </div>
      ) : (
        <div className="h-[400px] rounded-lg overflow-hidden">
          <MapContainer
            center={center}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={center} />
            {coordinates && weatherData && (
              <Marker position={[coordinates.latitude, coordinates.longitude]}>
                <Popup>
                  <div className="p-2">
                    <div className="flex items-center gap-2">
                      <img 
                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                        alt={weatherData.main}
                        className="w-10 h-10"
                      />
                      <div>
                        <h3 className="font-semibold">{weatherData.city}</h3>
                        <p className="text-sm">{weatherData.description || weatherData.main}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-lg font-bold">{celsiusToFahrenheit(weatherData.temp)}°F</p>
                      <p className="text-sm">Humidity: {weatherData.humidity}%</p>
                      <p className="text-sm">Wind: {Math.round(weatherData.wind_speed * 2.237)} mph</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      )}
    </div>
  );
}