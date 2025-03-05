export interface WeatherData {
  main: string;
  description?: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sealevel?: number;
  grndlevel?: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  country: string;
  city: string;
  sunrise: number;
  sunset: number;
  date: number;
  icon: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface InsightData {
  insights: string[];
}

export type Theme = 'light' | 'dark' | 'frosted' | 'sunset' | 'ocean';

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface WeatherAlert {
  event: string;
  description: string;
  start: number;
  end: number;
}

export interface ForecastData {
  date: number;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  weather: string;
  description: string;
  icon: string;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  visibility: number;
  pop: number; // Probability of precipitation
}