export async function getWeather(city, country) {
    const apiKey = `bd4ea33ecf905116d12af172e008dbae`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=en&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
}


export async function getWeatherByCoordinates(lat, lon) {
    const apiKey = `bd4ea33ecf905116d12af172e008dbae`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log(JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
}


export const getLocation = async (setLocation) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLocation({ latitude, longitude });
        },
        (err) => {
          console.error(err.message);
          setLocation(null);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocation(null);
    }
  };
  

export  const getCityName = async (lat, lon) => {
    const apiKey = '5e0d6652870f477d8747d9342b1eaed8'; // opencage api
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { city, country } = data.results[0].components;
      } else {
      }
    } catch (error) {
      console.error('Error fetching city name:', error);
    }
  };