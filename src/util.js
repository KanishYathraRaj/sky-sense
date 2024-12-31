import { useState } from "react";

// State variables
const [city, setCity] = useState('');
const [country, setCountry] = useState('');
const [latitude, setLatitude] = useState('');
const [longitude, setLongitude] = useState('');
const [date, setDate] = useState('');
const [temperature, setTemperature] = useState('');
const [precipitation, setPrecipitation] = useState('');
const [humidity, setHumidity] = useState('');
const [wind, setWind] = useState('');

export async function getWeather(city, country) {
    const apiKey = `bd4ea33ecf905116d12af172e008dbae`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=en&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data)); // For debugging

        setLatitude(data.coord.lat);
        setLongitude(data.coord.lon);
        setDate(new Date(data.dt * 1000).toLocaleDateString());
        setTemperature(data.main.temp);
        setPrecipitation(data.rain?.['1h'] || 0); // Rain data is optional
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);

        return data;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
}

export { city, setCity, country, setCountry, latitude, longitude, date, temperature, precipitation, humidity, wind };
