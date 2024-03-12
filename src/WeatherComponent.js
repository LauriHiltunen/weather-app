import React from 'react';
import axios from 'axios';
import getIconUrl from './WeatherIcons';

class WeatherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {
    const { latitude, longitude } = this.props;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    axios.get(url)
      .then((response) => {
        this.setState({ weatherData: response.data });
      })
      .catch((error) => {
        console.error("Error fetching weather data", error);
      });
  }

  render() {
    const { weatherData } = this.state;

    if (!weatherData) return <div className='sorting'>Loading...</div>;

    return (
      <div className='sorting'>
        <div>
          <h2 className='test'>{weatherData.name}</h2>
          <h3>{weatherData.main.temp}°C</h3>
          <img alt="weather-icon" src={getIconUrl(weatherData.weather[0].id)}/>
        </div>
      </div>
    );
  }
}

export default WeatherComponent;
