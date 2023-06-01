import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import Search from './components/search/Search';
import { WEATHER_API_KEY } from './api';
import "./App.css";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Fetch user's location
    const fetchUserLocation = async () => {
      try {
        const response = await axios.get(
          "https://wft-geo-db.p.rapidapi.com/v1/geo/ip",
          { headers: { "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY" } }
        );
        setLocation(`${response.data.latitude},${response.data.longitude}`);
      } catch (error) {
        console.log(error);
        setLocation("default-location"); // Set a default location in case of error
      }
    };

    fetchUserLocation();

    // Fetch weather data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${WEATHER_API_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${WEATHER_API_KEY}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <div>
      {weatherData ? (
        <div>
          <h1>{weatherData.name}</h1>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      ) : location ? (
        <p>Loading weather data...</p>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default App;

