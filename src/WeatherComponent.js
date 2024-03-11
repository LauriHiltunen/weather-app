import React from 'react';
import axios from 'axios';

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

    if (!weatherData) return <div>Loading...</div>;

    return (
        <div className='sorting'>
        <h2 className='test'>{weatherData.name}</h2>
        <h3>{weatherData.main.temp}°C</h3>
        <p>{weatherData.weather[0].description}</p>
        
      </div>
    );
  }
}

export default WeatherComponent;
