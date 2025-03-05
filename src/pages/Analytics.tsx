import React, { useEffect, useState } from 'react';
import { TrendingUp, LineChart, Zap, BarChart3, CloudRain, Thermometer } from 'lucide-react';
import { getLocation, getWeatherByCoordinates, getHistoricalData, getInsight } from '../services/weatherService';
import { Coordinates, WeatherData } from '../types';

export function Analytics() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    getLocation(setCoordinates);
  }, []);

  useEffect(() => {
    if (coordinates) {
      getWeatherByCoordinates(coordinates.latitude, coordinates.longitude, (data) => {
        setWeatherData(data);
        
        if (data) {
          // Get historical data based on current weather
          const history = getHistoricalData(data);
          setHistoricalData(history);
          
          // Get AI recommendations
          getInsight(data, (insights) => {
            const formattedRecommendations = formatRecommendations(insights, data);
            setRecommendations(formattedRecommendations);
          }, 'retail');
        }
        
        setLoading(false);
      });
    }
  }, [coordinates]);

  // Format insights into recommendation categories
  const formatRecommendations = (insights: string[], weatherData: WeatherData) => {
    if (!insights || insights.length === 0) return [];
    
    const categories = ['inventory', 'staffing', 'marketing'];
    const recommendations: any[] = [];
    
    // Distribute insights across categories
    insights.forEach((insight, index ) => {
      const category = categories[index % categories.length];
      let categoryName = '';
      
      switch(category) {
        case 'inventory':
          categoryName = 'Inventory Management';
          break;
        case 'staffing':
          categoryName = 'Staffing Optimization';
          break;
        case 'marketing':
          categoryName = 'Marketing Strategy';
          break;
      }
      
      recommendations.push({
        category: categoryName,
        text: insight,
        type: category
      });
    });
    
    // If we don't have enough recommendations, add some based on weather
    if (recommendations.length < 3) {
      if (!recommendations.some(r => r.type === 'inventory')) {
        if (weatherData.temp > 30) {
          recommendations.push({
            category: "Inventory Management",
            text: "Stock cooling products and summer items. Consider reducing perishable inventory.",
            type: "inventory"
          });
        } else if (weatherData.temp < 5) {
          recommendations.push({
            category: "Inventory Management",
            text: "Increase winter gear and comfort items. Prepare for potential supply chain delays.",
            type: "inventory"
          });
        } else {
          recommendations.push({
            category: "Inventory Management",
            text: "Optimal weather conditions - balance inventory across categories for maximum sales.",
            type: "inventory"
          });
        }
      }
      
      if (!recommendations.some(r => r.type === 'staffing')) {
        if (weatherData.temp > 25 && weatherData.humidity < 50) {
          recommendations.push({
            category: "Staffing Optimization",
            text: "Pleasant weather expected to increase foot traffic. Consider additional staff during peak hours.",
            type: "staffing"
          });
        } else if ((weatherData.temp < 0) || (weatherData.wind_speed > 15) || (weatherData.temp > 35)) {
          recommendations.push({
            category: "Staffing Optimization",
            text: "Extreme weather may reduce customer visits. Adjust staffing levels accordingly.",
            type: "staffing"
          });
        } else {
          recommendations.push({
            category: "Staffing Optimization",
            text: "Standard staffing levels recommended based on current weather conditions.",
            type: "staffing"
          });
        }
      }
      
      if (!recommendations.some(r => r.type === 'marketing')) {
        if (weatherData.main.toLowerCase().includes('rain')) {
          recommendations.push({
            category: "Marketing Strategy",
            text: "Promote rainy day specials and online ordering options during wet weather.",
            type: "marketing"
          });
        } else if (weatherData.temp > 30) {
          recommendations.push({
            category: "Marketing Strategy",
            text: "Promote heat relief products and services. Consider special promotions for online orders.",
            type: "marketing"
          });
        } else if (weatherData.temp < 5) {
          recommendations.push({
            category: "Marketing Strategy",
            text: "Highlight winter essentials and comfort items. Emphasize delivery services.",
            type: "marketing"
          });
        } else {
          recommendations.push({
            category: "Marketing Strategy",
            text: "Ideal conditions for outdoor promotions and sidewalk displays.",
            type: "marketing"
          });
        }
      }
    }
    
    return recommendations;
  };

  // Calculate performance metrics based on weather data
  const calculatePerformanceMetrics = () => {
    if (!weatherData || historicalData.length === 0) return null;
    
    // Calculate average values from historical data
    const avgFootTraffic = historicalData.reduce((sum, day) => sum + day.footTraffic, 0) / historicalData.length;
    const avgSales = historicalData.reduce((sum, day) => sum + day.sales, 0) / historicalData.length;
    
    // Calculate today's expected values based on current weather
    const todayTemp = weatherData.temp;
    const todayHumidity = weatherData.humidity;
    const todayWind = weatherData.wind_speed;
    
    // Adjust metrics based on weather conditions
    let footTrafficImpact = 0;
    let salesImpact = 0;
    let efficiencyScore = 85; // Base score
    
    // Temperature impact
    if (todayTemp > 30) {
      footTrafficImpact -= 12;
      salesImpact -= 8;
      efficiencyScore -= 10;
    } else if (todayTemp > 25) {
      footTrafficImpact -= 5;
      salesImpact -= 3;
      efficiencyScore -= 5;
    } else if (todayTemp < 0) {
      footTrafficImpact -= 15;
      salesImpact -= 10;
      efficiencyScore -= 12;
    } else if (todayTemp < 10) {
      footTrafficImpact -= 8;
      salesImpact -= 5;
      efficiencyScore -= 7;
    } else if (todayTemp >= 15 && todayTemp <= 25) {
      footTrafficImpact += 10;
      salesImpact += 8;
      efficiencyScore += 10;
    }
    
    // Weather condition impact
    if (weatherData.main.toLowerCase().includes('rain')) {
      footTrafficImpact -= 10;
      salesImpact -= 5;
      efficiencyScore -= 8;
    } else if (weatherData.main.toLowerCase().includes('snow')) {
      footTrafficImpact -= 15;
      salesImpact -= 8;
      efficiencyScore -= 12;
    } else if (weatherData.main.toLowerCase().includes('clear') && todayTemp > 15 && todayTemp < 28) {
      footTrafficImpact += 8;
      salesImpact += 5;
      efficiencyScore += 7;
    }
    
    // Wind impact
    if (todayWind > 10) {
      footTrafficImpact -= 7;
      salesImpact -= 4;
      efficiencyScore -= 5;
    }
    
    // Humidity impact
    if (todayHumidity > 85) {
      footTrafficImpact -= 5;
      salesImpact -= 3;
      efficiencyScore -= 3;
    } else if (todayHumidity < 30) {
      footTrafficImpact -= 2;
      salesImpact -= 1;
      efficiencyScore -= 2;
    }
    
    // Calculate final values
    const footTrafficChange = Math.round(footTrafficImpact);
    const salesChange = Math.round(salesImpact);
    const finalEfficiency = Math.min(100, Math.max(0, efficiencyScore));
    
    return {
      footTrafficChange,
      salesChange,
      efficiency: finalEfficiency
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[var(--text-secondary)] flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)] mb-4"></div>
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  const metrics = calculatePerformanceMetrics();

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-700 dark:text-blue-400 font-medium">Foot Traffic</span>
              <TrendingUp className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">
              {metrics ? (metrics.footTrafficChange > 0 ? '+' : '') + metrics.footTrafficChange + '%' : 'N/A'}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">vs. Average</p>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-700 dark:text-green-400 font-medium">Sales Impact</span>
              <LineChart className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-800 dark:text-green-300">
              {metrics ? (metrics.salesChange > 0 ? '+' : '') + metrics.salesChange + '%' : 'N/A'}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">Due to Weather</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-purple-700 dark:text-purple-400 font-medium">Efficiency</span>
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">
              {metrics ? metrics.efficiency + '%' : 'N/A'}
            </p>
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">Operational Score</p>
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Weather Impact Trends</h2>
        {historicalData.length > 0 ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[var(--text-secondary)] text-sm">Temperature Trend (°C)</span>
                <Thermometer className="h-4 w-4 text-[var(--text-secondary)]" />
              </div>
              <div className="h-12 bg-[var(--bg-primary)] rounded-lg flex items-end">
                {historicalData.map((day, i) => {
                  const height = Math.max(20, Math.min(100, (day.temp / 40) * 100));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-400 dark:bg-blue-600 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs mt-1 text-[var(--text-secondary)]">{day.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[var(--text-secondary)] text-sm">Foot Traffic Impact</span>
                <BarChart3 className="h-4 w-4 text-[var(--text-secondary)]" />
              </div>
              <div className="h-12 bg-[var(--bg-primary)] rounded-lg flex items-end">
                {historicalData.map((day, i) => {
                  const height = Math.max(20, Math.min(100, (day.footTraffic / 100) * 100));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-green-400 dark:bg-green-600 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs mt-1 text-[var(--text-secondary)]">{day.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[var(--text-secondary)] text-sm">Precipitation</span>
                <CloudRain className="h-4 w-4 text-[var(--text-secondary)]" />
              </div>
              <div className="h-12 bg-[var(--bg-primary)] rounded-lg flex items-end">
                {historicalData.map((day, i) => {
                  const height = Math.max(10, Math.min(100, (day.humidity / 100) * 100));
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-cyan-400 dark:bg-cyan-600 rounded-t"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs mt-1 text-[var(--text-secondary)]">{day.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-64 bg-[var(--bg-primary)] rounded-lg flex items-center justify-center">
            <span className="text-[var(--text-secondary)]">No historical data available</span>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className={`p-4 rounded-lg ${
              rec.type === 'inventory' ? 'bg-blue-50 dark:bg-blue-900/30' : 
              rec.type === 'staffing' ? 'bg-green-50 dark:bg-green-900/30' : 
              'bg-purple-50 dark:bg-purple-900/30'
            }`}>
              <h3 className={`font-medium mb-2 ${
                rec.type === 'inventory' ? 'text-blue-800 dark:text-blue-300' : 
                rec.type === 'staffing' ? 'text-green-800 dark:text-green-300' : 
                'text-purple-800 dark:text-purple-300'
              }`}>{rec.category}</h3>
              <p className={`${
                rec.type === 'inventory' ? 'text-blue-600 dark:text-blue-400' : 
                rec.type === 'staffing' ? 'text-green-600 dark:text-green-400' : 
                'text-purple-600 dark:text-purple-400'
              }`}>{rec.text}</p>
            </div>
          ))}
          
          {recommendations.length === 0 && (
            <div className="p-4 bg-[var(--bg-primary)] rounded-lg">
              <p className="text-[var(--text-secondary)]">No recommendations available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}