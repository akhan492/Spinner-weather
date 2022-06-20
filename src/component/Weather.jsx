import React, { useState } from "react";
import Loading from "./Loading";
import "./Weather.css";

function Weather() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  function getCityWeather() {
    setLocation("");
    setLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=df8805b218019cc28ee719f8c0d9667e
    `;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.message) {
          setError(data.message);
          setData(null);
        } else {
          setError(null);
          setData(data);
          console.log(data);
        }
      });
  }
  // if (loading) {
  //   return <Loading/>;
  // }
  function formSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="Container">
      <form onSubmit={formSubmit}>
        <input
          placeholder="enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <button onClick={getCityWeather}>Search</button>
      </form>
      {error ? <h4 style={{ color: "red" }}>{error}</h4> : null}

      {data ? (
        <div className="data">
          {loading ? (
            <Loading />
          ) : (
            <>
              <h1>Current Weather</h1>
              <h3>Temperature - {Math.ceil(data.main.temp - 273.15)}°C</h3>
              <h3>Pressure - {data.main.pressure}</h3>
              <h3> Visibility - {data.visibility}</h3>
              <h3> City - {data.name}</h3>
              <img
                class="img"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather"
              />{" "}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
export default Weather;
