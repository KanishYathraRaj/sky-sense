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
        return null; // Return null to indicate failure
    }
}
