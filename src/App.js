
import React, { useEffect, useState } from 'react';
import { useGeolocated } from "react-geolocated";
import axios from "axios";
import WeatherComponent from './WeatherComponent';
import ForecastComponent from './ForecastComponent';

function App() {

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  /* Fetches forecast data and current weather data to useStates. */
  function fetchData() {
   
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const urlWeather = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;
    const urlForecast = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;

    axios.get(urlWeather)
    .then((response1) => {
      setForecastData(response1.data);
    })
    .catch((error) => {
      console.error("Error fetching forecase data",error);
    });
    
    axios.get(urlForecast)
    .then((response2) => {
      setWeatherData(response2.data);
    })
    .catch((error) => {
      console.error("Error fetching forecase data",error);
    });
  }

  const [coordsAvailable, setcoordsAvailable] = useState(false);
  const [forecastData, setForecastData] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  

  // Changes coordsAvailable state to true causing use effect to call fetchdata function once
  if(isGeolocationAvailable && isGeolocationEnabled && coords && !coordsAvailable) {
    setcoordsAvailable(true);
  }

  /* Fetches data when coordinates available state changes to true. */
    useEffect(() => {
      if(coordsAvailable) {
        fetchData();
        console.log("haku");
      }
    },[coordsAvailable,setcoordsAvailable]);
        
        return (
          <div className="App">
            <div>
              {forecastData.length != 0
                ?(
                  <ForecastComponent forecastData={forecastData} />
                )
                : <div>Getting the location data&hellip; </div>}
              {weatherData.length != 0
                ?(
                  <WeatherComponent weatherData={weatherData} />
                )
                : <div>Getting the location data&hellip; </div>}

            {/* {isGeolocationAvailable && isGeolocationEnabled && coords
              ?(
              <div>
                <WeatherComponent latitude={coords.latitude} longitude={coords.longitude} />
                <ForecastComponent latitude={coords.latitude} longitude={coords.longitude} />
              </div>
              )
              : <div>Getting the location data&hellip; </div>} */}
              </div>
          </div>
        );
}
export default App;
