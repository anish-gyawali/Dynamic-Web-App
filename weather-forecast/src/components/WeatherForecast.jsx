import React, { useState } from "react";
import "./weatherForecast.css";

const API_KEY = "df4369ea538ff8ebf6727a987e6a88d0";

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    );
    if (!response.ok) {
      setWeatherData(null);
      return;
    }
    const data = await response.json();
    setWeatherData(data);
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const forecast = weatherData
    ? weatherData.list
        .filter((item, index) => index % 8 === 0)
        .slice(0, 5)
        .map((item) => {
          const date = new Date(item.dt * 1000);
          const day = days[date.getDay()];
          const temperature = Math.round(
            ((item.main.temp - 273.15) * 9) / 5 + 32
          );
          const description = item.weather[0].description;
          return { date, day, temperature, description };
        })
    : [];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="search-container"
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button className="search-button " type="submit">
          Search
        </button>
      </form>
      {weatherData === null ? (
        <p>No data available</p>
      ) : weatherData ? (
        weatherData.cod === "200" ? (
          <>
            {"Here is the next five days weather details of "}
            <b>{weatherData.city.name}</b>
            <div className="card-container">
              {forecast.map((item) => (
                <div className="card" key={item.date}>
                  <h3>
                    <u>{item.day}</u>
                  </h3>
                  <p>{item.date.toLocaleDateString()}</p>

                  <p>Temperature: {item.temperature}°F</p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No data available</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default WeatherForecast;
