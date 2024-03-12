import React from 'react';
import axios from 'axios';
import getIconUrl from './WeatherIcons';

class ForecastComponent extends React.Component {
  constructor(props) {
      super(props);
        this.state = {
          forecastData: null
        };
  }
  componentDidMount() {
    const {latitude, longitude} = this.props;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    axios.get(url)
    .then((response) => {
      this.setState({forecastData:response.data});
    })
    .catch((error) => {
      console.error("Error fetching forecase data",error);
    });
  }
  render() {
    const { forecastData } = this.state;

    if (!forecastData) return <div>Loading...</div>;
        
    return (
      <div>
        <h2>Forecast for {forecastData.city.name}</h2>
        <div className='weather-cards'>
          {forecastData.list.map((forecast,index) => (
            <div key={index} className='weather'>
              <h3> {new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
              <p>Temparature: {forecast.main.temp}°C</p>
              <img alt="weather-icon" src={getIconUrl(forecast.weather[0].id)}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default ForecastComponent;