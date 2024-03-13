import React from 'react';
import getIconUrl from './WeatherIcons';

class WeatherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null
    };
  }

  componentDidMount() {

    this.setState({weatherData:this.props.weatherData})
  }

  render() {
    const { weatherData } = this.state;

    let colors = ["#9bfdff","#0a016c","#000","#fff"];
    let date = new Date('2011', '04' - 1, '1', '23', '51', '00');

    let color = colors[0];
    let text_color = colors[3];

    if(date.getHours() < 7 || date.getHours() > 21) {
      color = colors[1];
      text_color = colors[2];
    }

    if (!weatherData) return <div className='sorting' style={{backgroundColor: color}}>Loading...</div>;
    
    return (
      <div className='sorting' style={{backgroundColor: color}}>
        <div>
          <h2 className='test' style={{color:text_color}}>{weatherData.name}</h2>
          <h3 style={{color:text_color}}>{Math.floor(weatherData.main.temp)}°C</h3>
          <img alt="weather-icon" src={getIconUrl(weatherData.weather[0].id)}/>
        </div>
      </div>
    );
  }
}

export default WeatherComponent;
