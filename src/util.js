export async function getWeather(city, country, setWeatherData) {
  const apiKey = `bd4ea33ecf905116d12af172e008dbae`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=en&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(JSON.stringify(data));
    setWeatherData(data);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
}

export async function getWeatherByCoordinates(lat, lon, setWeatherData) {
  const apiKey = `bd4ea33ecf905116d12af172e008dbae`;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(JSON.stringify(data));

    const main = data.weather[0].main;
    const temp = data.main.temp;
    const feels_like = data.main.feels_like;
    const temp_min = data.main.temp_min;
    const temp_max = data.main.temp_max;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const sealevel = data.main.sea_level;
    const grndlevel = data.main.grnd_level;
    const visibility = data.visibility;
    const wind_speed = data.wind.speed;
    const wind_deg = data.wind.deg;
    const clouds = data.clouds.all;
    const country = data.sys.country;
    const city = data.name;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const date = data.dt;
    const icon = data.weather[0].icon;

    const results = {
      main,
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      sealevel,
      grndlevel,
      visibility,
      wind_speed,
      wind_deg,
      clouds,
      country,
      city,
      sunrise,
      sunset,
      date,
      icon,
    };
    console.log(results);
    setWeatherData(results);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    setWeatherData(null);
  }
}

export const getLocation = async (setCoordinates) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setCoordinates({ latitude, longitude });
      },
      (err) => {
        console.error(err.message);
        setCoordinates(null);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    setCoordinates(null);
  }
};

export const convertToDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  return date.toLocaleString("en-US", {
    weekday: "long", // e.g., "Sunday"
    year: "numeric", // e.g., "2025"
    month: "long", // e.g., "January"
    day: "numeric", // e.g., "1"
    hour: "2-digit", // e.g., "12 PM"
    minute: "2-digit", // e.g., "30"
  });
};

export const getCityName = async (lat, lon) => {
  const apiKey = "5e0d6652870f477d8747d9342b1eaed8"; // opencage api
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { city, country } = data.results[0].components;
    } else {
    }
  } catch (error) {
    console.error("Error fetching city name:", error);
  }
};

export async function getInsight(weatherData, setInsightData, business) {
  const API_KEY = "AIzaSyDtRxzdQ1RLZNH2KSMtsNWP8ZKyIrtDBUo"; // remove d at last
  try {
    console.log("Making API request...", {
      timestamp: new Date().toISOString(),
    });

    const fullPrompt = `
      You weather data analysis expert.
      You are given the following weather data: ${JSON.stringify(
        weatherData,
        null,
        2
      )}
      Your task is to generate a short and engaging insight based on this weather data.
      Your insight should be short, informative, and engaging.
      Do not include any additional context or explanation.
      The given information should help business operations of ${business}.
      Make it point wise
      50 words maximum.
      `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${API_KEY}`,
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
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    const insightResponse = data.candidates[0].content.parts[0].text;
    console.log("Generated Insight:\n", insightResponse);

    const insights = insightResponse
      .split("*") // Split by the bullet point indicator
      .map((point) => point.split("-")[0].trim()) // Further split each bullet by "-" and take the first part, trimming whitespace
      .filter((point) => point.length > 0); // Filter out empty strings

    setInsightData(insights);
  } catch (error) {
    console.error("Error in API request:", {
      error: error.message,
    });
  }
}
