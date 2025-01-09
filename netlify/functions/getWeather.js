// netlify/functions/getWeather.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { city, state, country } = event.queryStringParameters;

    const apiKey = process.env.OWM_API_KEY; // Securely access the OpenWeatherMap API key
    const geoApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${apiKey}`;

    try {
        const geoResponse = await fetch(geoApiUrl);
        if (!geoResponse.ok) {
            throw new Error(`Error fetching geolocation data: ${geoResponse.statusText}`);
        }
        const geoData = await geoResponse.json();
        const cityGeo = geoData[0];

        const weatherApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${cityGeo.lat}&lon=${cityGeo.lon}&units=Imperial&appid=${apiKey}`;
        const weatherResponse = await fetch(weatherApiUrl);

        if (!weatherResponse.ok) {
            throw new Error(`Error fetching weather data: ${weatherResponse.statusText}`);
        }
        const weatherData = await weatherResponse.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                city: cityGeo.name,
                state: cityGeo.state,
                ...weatherData,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
