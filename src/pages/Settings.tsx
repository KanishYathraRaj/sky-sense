import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, MapPin, Link, Plus, Trash2, Save, Check, X } from 'lucide-react';
import { ThemeSelector } from '../components/ThemeSelector';
import { getLocation, getWeatherByCoordinates } from '../services/weatherService';
import { Coordinates, WeatherData } from '../types';
import { useSettings } from '../contexts/SettingsContext';

export function Settings() {
  const { units, setUnits } = useSettings();
  const [locations, setLocations] = useState<{id: string; name: string; isPrimary: boolean}[]>([]);
  const [newLocation, setNewLocation] = useState<string>('');
  const [addingLocation, setAddingLocation] = useState<boolean>(false);
  const [notifications, setNotifications] = useState({
    weatherAlerts: true,
    riskNotifications: true,
    dailyForecast: false,
    businessInsights: true
  });
  const [apiStatus, setApiStatus] = useState({
    weather: { connected: true, lastChecked: new Date().toISOString() },
    gemini: { connected: true, lastChecked: new Date().toISOString() }
  });
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  useEffect(() => {
    const savedNotifications = localStorage.getItem('weatherAppNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    const savedLocations = localStorage.getItem('weatherAppLocations');
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations));
    } else {
      getLocation(setCoordinates);
    }
  }, []);

  useEffect(() => {
    if (coordinates) {
      getWeatherByCoordinates(coordinates.latitude, coordinates.longitude, (data: WeatherData | null) => {
        if (data) {
          const locationName = `${data.city}, ${data.country}`;
          setCurrentLocation(locationName);
          
          if (locations.length === 0) {
            const newLocationObj = {
              id: generateId(),
              name: locationName,
              isPrimary: true
            };
            setLocations([newLocationObj]);
            localStorage.setItem('weatherAppLocations', JSON.stringify([newLocationObj]));
          }
        }
      });
    }
  }, [coordinates, locations.length]);

  useEffect(() => {
    localStorage.setItem('weatherAppNotifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (locations.length > 0) {
      localStorage.setItem('weatherAppLocations', JSON.stringify(locations));
    }
  }, [locations]);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=bd4ea33ecf905116d12af172e008dbae`
        );
        
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash?key=AIzaSyDtRxzdQ1RLZNH2KSMtsNWP8ZKyIrtDBUo`
        );
        
        setApiStatus({
          weather: { 
            connected: weatherResponse.ok, 
            lastChecked: new Date().toISOString() 
          },
          gemini: { 
            connected: geminiResponse.ok, 
            lastChecked: new Date().toISOString() 
          }
        });
      } catch (error) {
        console.error("Error checking API status:", error);
      }
    };
    
    checkApiStatus();
  }, []);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    setUnits(newUnit);
  };

  const handleAddLocation = () => {
    if (newLocation.trim()) {
      const newLocationObj = {
        id: generateId(),
        name: newLocation,
        isPrimary: locations.length === 0
      };
      
      setLocations(prev => [...prev, newLocationObj]);
      setNewLocation('');
      setAddingLocation(false);
    }
  };

  const handleRemoveLocation = (id: string) => {
    const locationToRemove = locations.find(loc => loc.id === id);
    const wasPrimary = locationToRemove?.isPrimary;
    
    const updatedLocations = locations.filter(loc => loc.id !== id);
    
    if (wasPrimary && updatedLocations.length > 0) {
      updatedLocations[0].isPrimary = true;
    }
    
    setLocations(updatedLocations);
  };

  const handleSetPrimary = (id: string) => {
    setLocations(prev => 
      prev.map(loc => ({
        ...loc,
        isPrimary: loc.id === id
      }))
    );
  };

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6 px-4 pb-24">
      {/* Theme Settings */}
      <ThemeSelector />

      {/* Units Settings */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Units</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => handleUnitChange('imperial')}
            className={`flex-1 px-4 py-3 rounded-xl transition-colors ${
              units === 'imperial' 
                ? 'bg-[var(--accent)] text-white' 
                : 'bg-[var(--bg-primary)] text-[var(--text-secondary)]'
            }`}
          >
            Imperial (°F)
          </button>
          <button 
            onClick={() => handleUnitChange('metric')}
            className={`flex-1 px-4 py-3 rounded-xl transition-colors ${
              units === 'metric' 
                ? 'bg-[var(--accent)] text-white' 
                : 'bg-[var(--bg-primary)] text-[var(--text-secondary)]'
            }`}
          >
            Metric (°C)
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="h-6 w-6 text-[var(--accent)]" />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={value}
                  onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-[var(--accent)]/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent)]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Location Settings */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Locations</h2>
        <div className="space-y-4">
          {locations.map(location => (
            <div key={location.id} className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-[var(--accent)]" />
                <span className="truncate">{location.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {location.isPrimary ? (
                  <span className="text-[var(--accent)]">Primary</span>
                ) : (
                  <button 
                    onClick={() => handleSetPrimary(location.id)}
                    className="p-2 hover:bg-[var(--accent)]/10 rounded-lg transition-colors"
                    title="Set as primary location"
                  >
                    <Check className="h-5 w-5 text-[var(--accent)]" />
                  </button>
                )}
                <button 
                  onClick={() => handleRemoveLocation(location.id)}
                  className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove location"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
          
          {addingLocation ? (
            <div className="flex items-center gap-3 p-4 bg-[var(--bg-primary)] rounded-xl">
              <MapPin className="h-6 w-6 text-[var(--accent)]" />
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Enter location name"
                className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[var(--text-primary)]"
              />
              <button 
                onClick={handleAddLocation}
                className="p-2 hover:bg-green-500/10 rounded-lg transition-colors"
                title="Save location"
              >
                <Save className="h-5 w-5 text-green-500" />
              </button>
              <button 
                onClick={() => {
                  setAddingLocation(false);
                  setNewLocation('');
                }}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                title="Cancel"
              >
                <X className="h-5 w-5 text-red-500" />
              </button>
            </div>
          ) : (
            <button 
              className="flex items-center gap-2 text-[var(--accent)] p-2"
              onClick={() => setAddingLocation(true)}
            >
              <Plus className="h-5 w-5" />
              <span>Add Location</span>
            </button>
          )}
        </div>
      </div>

      {/* API Integration */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">API Integration</h2>
        <div className="space-y-4">
          {Object.entries(apiStatus).map(([key, status]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-[var(--bg-primary)] rounded-xl">
              <div className="flex items-center gap-3">
                <Link className="h-6 w-6 text-[var(--accent)]" />
                <div>
                  <span className="block capitalize">{key} API</span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    Last checked: {formatDate(status.lastChecked)}
                  </span>
                </div>
              </div>
              <span className={status.connected ? "text-green-500" : "text-red-500"}>
                {status.connected ? "Connected" : "Disconnected"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Data Management</h2>
        <div className="space-y-4">
          <div className="p-4 bg-[var(--bg-primary)] rounded-xl">
            <p className="text-[var(--text-secondary)] mb-4">
              Clear local data and reset all settings to default values.
            </p>
            <button 
              className="w-full px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
            >
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}