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
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button type="submit">Search</button>
      </form>
      {weatherData === null ? (
        <p>No data available</p>
      ) : weatherData ? (
        weatherData.cod === "200" ? (
          <>
            {"Here is the next five days weather details of "}
            <b>{weatherData.city.name}</b>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Temperature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {forecast.map((item) => (
                  <tr key={item.date}>
                    <td>{item.date.toLocaleDateString()}</td>
                    <td>{item.day}</td>
                    <td>{item.temperature}°F</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
