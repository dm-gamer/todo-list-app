import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const API_KEY = "25895defc3bc6b437f9a549428dcaea4";

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }, []);

  return (
    <div className="weather">
      {weather ? (
        <p>🌤 {weather.name}: {weather.main.temp}°C</p>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
