import React, { useEffect, useState } from 'react';
import { AlertOctagon, Zap, CloudLightning, ShoppingBag, Users, Droplets } from 'lucide-react';
import { getLocation, getWeatherByCoordinates, getWeatherAlerts } from '../services/weatherService';
import { Coordinates, WeatherData } from '../types';

export function Risks() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    getLocation(setCoordinates);
  }, []);

  useEffect(() => {
    if (coordinates) {
      getWeatherByCoordinates(coordinates.latitude, coordinates.longitude, setWeatherData);
      
      // Get weather alerts
      getWeatherAlerts(coordinates.latitude, coordinates.longitude)
        .then(alertData => {
          setAlerts(alertData);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching alerts:", err);
          setAlerts([]);
          setLoading(false);
        });
    }
  }, [coordinates]);

  // Calculate risk levels based on weather data
  const calculateRiskLevels = () => {
    if (!weatherData) return { high: [], medium: [], low: [] };
    
    const high: string[] = [];
    const medium: string[] = [];
    const low: string[] = [];
    
    // Temperature risks
    if (weatherData.temp > 35) {
      high.push("Extreme heat warning");
    } else if (weatherData.temp > 30) {
      medium.push("Heat advisory");
    } else if (weatherData.temp < -10) {
      high.push("Extreme cold warning");
    } else if (weatherData.temp < 0) {
      medium.push("Freeze warning");
    }
    
    // Wind risks
    if (weatherData.wind_speed > 20) {
      high.push("High wind warning");
    } else if (weatherData.wind_speed > 10) {
      medium.push("Wind advisory");
    } else if (weatherData.wind_speed > 5) {
      low.push("Light winds expected");
    }
    
    // Humidity risks
    if (weatherData.humidity > 90) {
      medium.push("Very humid conditions");
    } else if (weatherData.humidity < 20) {
      medium.push("Very dry conditions");
    }
    
    // Weather condition risks
    if (weatherData.main.toLowerCase().includes('thunderstorm')) {
      high.push("Thunderstorm warning");
    } else if (weatherData.main.toLowerCase().includes('rain')) {
      medium.push("Rain may affect outdoor operations");
    } else if (weatherData.main.toLowerCase().includes('snow')) {
      medium.push("Snow may affect transportation");
    } else if (weatherData.main.toLowerCase().includes('fog')) {
      medium.push("Fog may reduce visibility");
    }
    
    // Add alerts if they exist
    if (alerts.length > 0) {
      high.push(...alerts);
    }
    
    // Ensure we have at least one item in each category for display purposes
    if (low.length === 0) low.push("No significant risks");
    
    return { high, medium, low };
  };

  // Calculate industry impact based on weather conditions
  const calculateIndustryImpact = () => {
    if (!weatherData) return [];
    
    const impacts = [
      {
        industry: "Retail",
        icon: ShoppingBag,
        impact: weatherData.temp > 30 || weatherData.temp < 0 || weatherData.wind_speed > 15 ? "High" : 
                weatherData.wind_speed > 8 || weatherData.humidity > 85 ? "Medium" : "Low",
        details: weatherData.temp > 30 ? "High temperatures may reduce foot traffic" :
                 weatherData.temp < 0 ? "Cold weather may affect store visits" :
                 weatherData.wind_speed > 15 ? "Strong winds may deter shoppers" :
                 weatherData.humidity > 85 ? "High humidity may affect comfort" : 
                 "Favorable conditions for retail operations"
      },
      {
        industry: "Hospitality",
        icon: Users,
        impact: weatherData.temp > 32 || weatherData.temp < -5 || alerts.length > 0 ? "High" : 
                weatherData.temp > 28 || weatherData.temp < 0 ? "Medium" : "Low",
        details: weatherData.temp > 32 ? "Extreme heat may increase AC costs" :
                 weatherData.temp < -5 ? "Extreme cold may affect heating systems" :
                 alerts.length > 0 ? "Weather alerts may affect bookings" :
                 "Moderate impact on hospitality operations"
      },
      {
        industry: "Agriculture",
        icon: Droplets,
        impact: weatherData.temp > 35 || weatherData.temp < -2 || weatherData.humidity < 30 ? "High" : 
                weatherData.wind_speed > 10 || weatherData.humidity > 90 ? "Medium" : "Low",
        details: weatherData.temp > 35 ? "Extreme heat may damage crops" :
                 weatherData.temp < -2 ? "Freezing temperatures may affect plants" :
                 weatherData.humidity < 30 ? "Low humidity may cause drought stress" :
                 weatherData.humidity > 90 ? "High humidity may increase disease risk" :
                 "Favorable conditions for agricultural operations"
      }
    ];
    
    return impacts;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[var(--text-secondary)] flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)] mb-4"></div>
          <p>Loading risk assessment...</p>
        </div>
      </div>
    );
  }

  const riskLevels = calculateRiskLevels();
  const industryImpacts = calculateIndustryImpact();

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Risk Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-700 dark:text-red-400 font-medium">High Risk</span>
              <AlertOctagon className="h-5 w-5 text-red-500" />
            </div>
            {riskLevels.high.length > 0 ? (
              <div className="space-y-2">
                {riskLevels.high.map((risk, index) => (
                  <p key={index} className="text-sm text-red-600 dark:text-red-300">{risk}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-red-600 dark:text-red-300">No high risks detected</p>
            )}
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-700 dark:text-yellow-400 font-medium">Medium Risk</span>
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
            {riskLevels.medium.length > 0 ? (
              <div className="space-y-2">
                {riskLevels.medium.map((risk, index) => (
                  <p key={index} className="text-sm text-yellow-600 dark:text-yellow-300">{risk}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-yellow-600 dark:text-yellow-300">No medium risks detected</p>
            )}
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700 dark:text-green-400 font-medium">Low Risk</span>
              <CloudLightning className="h-5 w-5 text-green-500" />
            </div>
            {riskLevels.low.length > 0 ? (
              <div className="space-y-2">
                {riskLevels.low.map((risk, index) => (
                  <p key={index} className="text-sm text-green-600 dark:text-green-300">{risk}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-green-600 dark:text-green-300">No significant risks</p>
            )}
          </div>
        </div>
      </div>

      {/* Risk Heatmap */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Regional Risk Heatmap</h2>
        <div className="grid grid-cols-5 gap-2 h-48">
          {[...Array(25)].map((_, i) => {
            // Generate a more realistic heatmap based on actual weather data
            let riskClass = "bg-green-200 dark:bg-green-800/50";
            
            if (weatherData) {
              // Use weather data to influence the heatmap
              const tempFactor = Math.abs(weatherData.temp - 20) / 20; // Distance from ideal temp (20°C)
              const windFactor = weatherData.wind_speed / 15;
              const humidityFactor = Math.abs(weatherData.humidity - 50) / 50;
              
              // Combined risk factor (0-1)
              const riskFactor = (tempFactor + windFactor + humidityFactor) / 3;
              
              // Add some randomness for visual interest
              const randomFactor = Math.random() * 0.3;
              const totalRisk = riskFactor + randomFactor;
              
              if (totalRisk > 0.7 || (i % 7 === 0 && totalRisk > 0.4)) {
                riskClass = "bg-red-200 dark:bg-red-800/50";
              } else if (totalRisk > 0.4 || (i % 5 === 0 && totalRisk > 0.2)) {
                riskClass = "bg-yellow-200 dark:bg-yellow-800/50";
              }
            } else {
              // Fallback to the original pattern if no weather data
              if (i % 7 === 0) {
                riskClass = "bg-red-200 dark:bg-red-800/50";
              } else if (i % 5 === 0) {
                riskClass = "bg-yellow-200 dark:bg-yellow-800/50";
              }
            }
            
            return <div key={i} className={`rounded ${riskClass}`} />;
          })}
        </div>
        <div className="flex justify-between mt-4 text-sm text-[var(--text-secondary)]">
          <span>Low Risk</span>
          <span>Medium Risk</span>
          <span>High Risk</span>
        </div>
      </div>

      {/* Industry Impact */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Industry Impact Analysis</h2>
        <div className="space-y-4">
          {industryImpacts.map((item, index) => (
            <div key={index} className="flex flex-col p-4 bg-[var(--bg-primary)] rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <item.icon className="h-6 w-6 text-[var(--accent)]" />
                  <span className="font-medium">{item.industry}</span>
                </div>
                <span className={`
                  ${item.impact === 'High' ? 'text-red-600 dark:text-red-400' : 
                    item.impact === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-green-600 dark:text-green-400'}
                `}>
                  {item.impact} Impact
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}