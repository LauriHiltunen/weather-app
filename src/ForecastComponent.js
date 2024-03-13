import React from 'react';
import getIconUrl from './WeatherIcons';

class ForecastComponent extends React.Component {
  constructor(props) {
      super(props);
        this.state = {
          forecastData: null
        };
  }
  componentDidMount() {
    this.setState({forecastData:this.props.forecastData})
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
              <p>Temperature: {Math.floor(forecast.main.temp)}°C</p>
              <img alt="weather-icon" src={getIconUrl(forecast.weather[0].id)}/>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default ForecastComponent;