import { WeatherData, Coordinates, InsightData, WeatherAlert } from '../types';

// OpenWeatherMap API key
const WEATHER_API_KEY = `bd4ea33ecf905116d12af172e008dbae`;
// Gemini API key
const GEMINI_API_KEY = "AIzaSyDtRxzdQ1RLZNH2KSMtsNWP8ZKyIrtDBUo";

export async function getWeather(city: string, country: string, setWeatherData: (data: WeatherData | null) => void) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=en&units=metric&appid=${WEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    const processedData = processWeatherData(data);
    setWeatherData(processedData);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    setWeatherData(null);
  }
}

export async function getWeatherByCoordinates(
  lat: number,
  lon: number,
  setWeatherData: (data: WeatherData | null) => void
) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    
    const processedData = processWeatherData(data);
    setWeatherData(processedData);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    setWeatherData(null);
  }
}

function processWeatherData(data: any): WeatherData {
  return {
    main: data.weather[0].main,
    description: data.weather[0].description,
    temp: data.main.temp,
    feels_like: data.main.feels_like,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    sealevel: data.main.sea_level,
    grndlevel: data.main.grnd_level,
    visibility: data.visibility,
    wind_speed: data.wind.speed,
    wind_deg: data.wind.deg,
    clouds: data.clouds.all,
    country: data.sys.country,
    city: data.name,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    date: data.dt,
    icon: data.weather[0].icon,
  };
}

export const getLocation = async (setCoordinates: (coords: Coordinates | null) => void) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        setCoordinates({ latitude: 40.7128, longitude: -74.0060 });
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    setCoordinates({ latitude: 40.7128, longitude: -74.0060 });
  }
};

export const convertToDateTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const convertToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

export async function getInsight(
  weatherData: WeatherData,
  setInsightData: (data: string[]) => void,
  business: string = 'retail'
) {
  try {
    const fullPrompt = `
      You are a weather data analysis expert.
      You are given the following weather data: ${JSON.stringify(weatherData, null, 2)}
      Your task is to generate 3-4 short and engaging insights based on this weather data.
      Your insights should be informative and actionable for business operations.
      The insights should help ${business} business operations.
      Make each insight a separate point.
      Each insight should be 15-20 words maximum.
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    let insightText = '';
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      insightText = data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Unexpected response format from Gemini API");
    }

    const insights = insightText
      .split(/\n+/)
      .map(line => line.replace(/^[•*-]\s*/, '').trim())
      .filter(line => line.length > 0);

    if (insights.length === 0) {
      if (weatherData.main.toLowerCase().includes('rain')) {
        setInsightData([
          "Rainy conditions may reduce foot traffic. Consider online promotions.",
          "Stock umbrellas and rain gear near entrances for impulse purchases.",
          "Adjust staffing levels for potential slower in-store traffic."
        ]);
      } else if (weatherData.temp > 30) {
        setInsightData([
          "High temperatures may increase cold beverage and cooling product sales.",
          "Consider extending air-conditioned seating areas to attract heat-escaping customers.",
          "Promote delivery services to accommodate those avoiding the heat."
        ]);
      } else if (weatherData.temp < 5) {
        setInsightData([
          "Cold weather increases demand for hot beverages and comfort foods.",
          "Display winter accessories prominently for impulse purchases.",
          "Ensure adequate heating and create cozy atmosphere to encourage longer stays."
        ]);
      } else {
        setInsightData([
          "Moderate weather conditions are optimal for foot traffic and outdoor displays.",
          "Balance inventory across seasonal categories for maximum sales potential.",
          "Ideal conditions for sidewalk sales or outdoor promotions."
        ]);
      }
    } else {
      setInsightData(insights);
    }
  } catch (error) {
    console.error("Error in Gemini API request:", error);
    if (weatherData.main.toLowerCase().includes('rain')) {
      setInsightData([
        "Rainy conditions may reduce foot traffic. Consider online promotions.",
        "Stock umbrellas and rain gear near entrances for impulse purchases.",
        "Adjust staffing levels for potential slower in-store traffic."
      ]);
    } else if (weatherData.temp > 30) {
      setInsightData([
        "High temperatures may increase cold beverage and cooling product sales.",
        "Consider extending air-conditioned seating areas to attract heat-escaping customers.",
        "Promote delivery services to accommodate those avoiding the heat."
      ]);
    } else if (weatherData.temp < 5) {
      setInsightData([
        "Cold weather increases demand for hot beverages and comfort foods.",
        "Display winter accessories prominently for impulse purchases.",
        "Ensure adequate heating and create cozy atmosphere to encourage longer stays."
      ]);
    } else {
      setInsightData([
        "Moderate weather conditions are optimal for foot traffic and outdoor displays.",
        "Balance inventory across seasonal categories for maximum sales potential.",
        "Ideal conditions for sidewalk sales or outdoor promotions."
      ]);
    }
  }
}

export async function getWeatherAlerts(lat: number, lon: number): Promise<string[]> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${WEATHER_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.alerts && data.alerts.length > 0) {
      return data.alerts.map((alert: any) => alert.description || alert.event);
    }
    
    const alerts: string[] = [];
    
    if (data.current) {
      const { temp, wind_speed, humidity } = data.current;
      
      if (temp > 30) {
        alerts.push("Heat Advisory: High temperatures may affect outdoor activities");
      } else if (temp < 0) {
        alerts.push("Freeze Warning: Sub-freezing temperatures expected");
      }
      
      if (wind_speed > 10) {
        alerts.push("Wind Advisory: Strong winds may impact outdoor operations");
      }
      
      if (humidity > 85) {
        alerts.push("High Humidity: May affect product storage and customer comfort");
      } else if (humidity < 30) {
        alerts.push("Low Humidity: Dry conditions may affect sensitive products");
      }
    }
    
    return alerts;
  } catch (error) {
    console.error("Failed to fetch weather alerts:", error);
    return generateFallbackAlerts(lat, lon);
  }
}

async function generateFallbackAlerts(lat: number, lon: number): Promise<string[]> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    const alerts: string[] = [];
    
    if (data.main) {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      
      if (temp > 30) {
        alerts.push("Heat Advisory: High temperatures may affect outdoor activities");
      } else if (temp < 0) {
        alerts.push("Freeze Warning: Sub-freezing temperatures expected");
      }
      
      if (humidity > 85) {
        alerts.push("High Humidity: May affect product storage and customer comfort");
      } else if (humidity < 30) {
        alerts.push("Low Humidity: Dry conditions may affect sensitive products");
      }
    }
    
    if (data.wind && data.wind.speed > 10) {
      alerts.push("Wind Advisory: Strong winds may impact outdoor operations");
    }
    
    if (data.weather && data.weather.length > 0) {
      const condition = data.weather[0].main.toLowerCase();
      
      if (condition.includes('thunderstorm')) {
        alerts.push("Thunderstorm Warning: Lightning and heavy rain may affect operations");
      } else if (condition.includes('rain') && data.rain && data.rain['1h'] > 10) {
        alerts.push("Heavy Rain Warning: Flooding possible in low-lying areas");
      } else if (condition.includes('snow')) {
        alerts.push("Snow Advisory: Slippery conditions may affect transportation");
      } else if (condition.includes('fog')) {
        alerts.push("Fog Advisory: Reduced visibility may affect transportation");
      }
    }
    
    return alerts;
  } catch (error) {
    console.error("Failed to generate fallback alerts:", error);
    return [];
  }
}

export async function getForecast(lat: number, lon: number): Promise<any[]> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const processedForecast: any[] = [];
    const dailyMap = new Map();
    
    if (data.list && data.list.length > 0) {
      data.list.forEach((item: any) => {
        const date = new Date(item.dt * 1000);
        const day = date.toISOString().split('T')[0];
        
        if (!dailyMap.has(day) || date.getHours() === 12) {
          dailyMap.set(day, {
            date: item.dt,
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            temp_min: item.main.temp_min,
            temp_max: item.main.temp_max,
            pressure: item.main.pressure,
            humidity: item.main.humidity,
            weather: item.weather[0].main,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            clouds: item.clouds.all,
            wind_speed: item.wind.speed,
            wind_deg: item.wind.deg,
            visibility: item.visibility,
            pop: item.pop,
          });
        }
      });
      
      dailyMap.forEach((value) => {
        processedForecast.push(value);
      });
    }
    
    return processedForecast;
  } catch (error) {
    console.error("Failed to fetch forecast data:", error);
    return [];
  }
}

export function getHistoricalData(weatherData: WeatherData | null): any[] {
  if (!weatherData) return [];
  
  const baseTemp = weatherData.temp;
  const baseHumidity = weatherData.humidity;
  const baseWind = weatherData.wind_speed;
  const condition = weatherData.main.toLowerCase();
  
  const history = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Create more realistic variations based on weather patterns
    const dayProgress = (6 - i) / 6; // 0 to 1 representing progress through the week
    const trendFactor = Math.sin(dayProgress * Math.PI) * 2; // Creates a wave pattern
    
    // Temperature variation
    let tempVariation = (Math.random() * 4 - 2) + trendFactor;
    if (condition.includes('clear')) {
      tempVariation += 2; // Clear days tend to be warmer
    } else if (condition.includes('rain')) {
      tempVariation -= 1; // Rainy days tend to be cooler
    }
    
    // Humidity variation
    let humidityVariation = (Math.random() * 15 - 7.5) + (trendFactor * 3);
    if (condition.includes('rain')) {
      humidityVariation += 10; // Higher humidity during rainy periods
    } else if (condition.includes('clear')) {
      humidityVariation -= 5; // Lower humidity during clear weather
    }
    
    // Wind variation
    let windVariation = (Math.random() * 3 - 1.5) + (trendFactor * 0.5);
    if (condition.includes('storm')) {
      windVariation += 3; // Stronger winds during storms
    }
    
    const temp = baseTemp + tempVariation;
    const humidity = Math.min(100, Math.max(0, baseHumidity + humidityVariation));
    const wind = Math.max(0, baseWind + windVariation);
    
    // Calculate foot traffic based on weather conditions
    let footTrafficBase = 100;
    if (temp > 30 || temp < 5) footTrafficBase -= 20;
    if (humidity > 85) footTrafficBase -= 10;
    if (wind > 10) footTrafficBase -= 15;
    if (condition.includes('rain')) footTrafficBase -= 25;
    if (condition.includes('clear') && temp > 15 && temp < 25) footTrafficBase += 15;
    
    // Add daily patterns
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) footTrafficBase += 20; // Weekend boost
    if (dayOfWeek === 5) footTrafficBase += 15; // Friday boost
    
    const footTraffic = Math.max(0, Math.min(100, footTrafficBase + (Math.random() * 10 - 5)));
    
    // Calculate sales impact based on foot traffic and weather
    let salesBase = footTraffic * 0.8;
    if (condition.includes('rain')) salesBase += 5; // Online sales increase
    if (temp > 30) salesBase += 10; // Higher sales of seasonal items
    if (temp < 5) salesBase += 8; // Higher sales of winter items
    
    const sales = Math.max(0, Math.min(100, salesBase + (Math.random() * 8 - 4)));
    
    history.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      temp,
      humidity,
      wind,
      footTraffic,
      sales
    });
  }
  
  return history;
}