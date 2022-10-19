import { useState, useEffect } from "react";
import "./App.css";
import UseApi from "./UseApi";

function App() {
  const [units, setUnits] = useState("metric");
  const [unit, setUnit] = useState("C");
  const [windSpeedUnit, setWindSpeedUnit] = useState("m/s");


  const changeUnits = () => {
    if (units === "metric") {
      setUnits("imperial");
    }
    if (units === "imperial") {
      setUnits("metric");
    }
    if (unit === "C") {
      setUnit("F");
    } else {
      setUnit("C");
    }
    if (windSpeedUnit === "m/s") {
      setWindSpeedUnit("mph");
    } else {
      setWindSpeedUnit("m/s");
    }
  };

  const apikey = "bb704b2274e9e75cabc1c802f9102b83";

  const { data, getData } = UseApi();
  const temperature = data.main?.temp;
  const temp = Math.trunc(temperature);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getData(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apikey}&units=${units} `
      );
    });
  }, [units]);

  console.log(data);

  const desc = `${data.weather?.[0].description}`;
  const icon = `http://openweathermap.org/img/wn/${data.weather?.[0].icon}.png`;

  return (
    <div className="App">
      <h3>
        {data.name} | {data.sys?.country}
      </h3>
      <img src={icon} alt="" />
      <h1>
        {temp}°{unit}
      </h1>
      <h4>
        Feels like: {data.main?.feels_like}°{unit}
      </h4>
      <h3>{desc}</h3>
      <h4>Humidity: {data.main?.humidity}%</h4>
      <h4>
        Wind speed: {data.wind?.speed} {windSpeedUnit}
      </h4>
      <h4>Clouds: {data.clouds?.all}%</h4>
      <h4>Atmospheric pressure: {data.main?.pressure} hPa</h4>

      <button onClick={changeUnits}>Change Units</button>
    </div>
  );
}

export default App;
