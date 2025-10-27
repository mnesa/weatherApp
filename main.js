const cityInput = document.getElementById("city");
const weatherResult = document.getElementById("weatherResult");
const btn = document.getElementById("getWeather");

btn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.innerHTML = "⚠️ Please enter a city name";
    return;
  }

  try {
    // Step 1: First, let's find the latitude & longitude from the city name.(Open-Meteo geocoding API)
    const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Step 2: Get weather data with latitude & longitude
    const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    
    const weatherData = await weatherRes.json();

    const weather = weatherData.current_weather;

    weatherResult.innerHTML = `
      <h3>${name}, ${country}</h3>
      <p>🌡️ Temperature: ${weather.temperature}°C</p>
      <p>💨 Wind Speed: ${weather.windspeed} km/h</p>
      <p>⏱️ Time: ${weather.time}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `❌ Error: ${error.message}`;
  }
}






