import React, { useState, useEffect } from 'react';
import { ForecastData } from './ForecastData';

export function Forecast(props) {
  const [ forecast, setForecast ] = useState([])

  const getForecast = async () => {
    if (props.location) {
        const location = props.location
        const url = `http://api.weatherapi.com/v1/forecast.json?key=75c17c8587e14a89a0113348230907&q=${location}&days=5&aqi=no&alerts=no`
        const response = await fetch(url);
        const responseJSON = await response.json();
        const forecastArray = await responseJSON.forecast
        const forecastDays = await forecastArray.forecastday

        if (forecastDays) {
            setForecast(forecastDays)
            }
        }
    }

    useEffect(() => {
        getForecast(props.location)
    }, [])

    const allForecastData = forecast.map((date) => <ForecastData key={date.date} forecast={date} />);

    return (
    <div className="forecast">
      <div className="header">
        <h1>Five Day Forecast</h1>
      </div>
      <div className="enter-zip">
        <button onClick={getForecast} className="get-weather-button" >Get Weather</button>
      </div>
        { forecast.length === 0 && <p className="please-enter" >Please enter a location</p> }
      <div className="five-day-forecast" >
        {allForecastData}     
      </div>
    </div>
  );
}

