import React, { useState, useEffect } from 'react';
import { Cloud, MapPin, Search } from 'lucide-react';
import { getWeatherByCoordinates, getLocation } from '../services/weatherService';
import { WeatherData, Coordinates } from '../types';

export function Header() {
  const [city, setCity] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<string>('Loading location...');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    getLocation(setCoordinates);
  }, []);

  useEffect(() => {
    if (coordinates) {
      getWeatherByCoordinates(coordinates.latitude, coordinates.longitude, (data: WeatherData | null) => {
        if (data) {
          setCurrentLocation(`${data.city}, ${data.country}`);
        } else {
          setCurrentLocation('Location unavailable');
        }
      });
    }
  }, [coordinates]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      setCurrentLocation(city);
      setShowSearch(false);
      setCity('');
    }
  };

  return (
    <header className="flex flex-col items-start gap-4 mb-6 px-4 pt-6">
      <div className="flex items-center gap-3 w-full">
        <Cloud className="h-8 w-8 text-[var(--accent)]" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--accent)] to-purple-500 bg-clip-text text-transparent">
          SkySense
        </h1>
      </div>
      
      <div className="w-full">
        {showSearch ? (
          <form onSubmit={handleSearch} className="flex w-full">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 rounded-l-xl border border-r-0 border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-r-xl"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        ) : (
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg cursor-pointer w-full"
            onClick={() => setShowSearch(true)}
          >
            <MapPin className="h-5 w-5 text-[var(--accent)]" />
            <span className="text-[var(--text-secondary)] truncate">{currentLocation}</span>
          </div>
        )}
      </div>
    </header>
  );
}