import React from 'react';
import { useGeolocated } from "react-geolocated";
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
        return (
          <div className="App">
            {isGeolocationAvailable && isGeolocationEnabled && coords
              ?(
              <div>
                <WeatherComponent latitude={coords.latitude} longitude={coords.longitude} />
                <ForecastComponent latitude={coords.latitude} longitude={coords.longitude} />
              </div>
              )
              : <div>Getting the location data&hellip; </div>}
          </div>
        );
}
export default App;
