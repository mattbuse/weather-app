import React, { useState, useEffect } from 'react';


export function Current(props) {
  const [ currentWeather, setCurrentWeather ] = useState([])
  const [ currentLocation, setCurrentLocation ] = useState('')
  const location = props.location

  const getCurrentWeather = async () => {
    if (props.location) {
        const location = props.location
        const url = `http://api.weatherapi.com/v1/current.json?key=75c17c8587e14a89a0113348230907&q=${location}&aqi=no`
        const response = await fetch(url);
        const responseJSON = await response.json();

        if (responseJSON.current) {
        setCurrentWeather(responseJSON.current)
        }
        updateLocation()
    }
  }

  const updateLocation = () => {
    setCurrentLocation(location);
  }

  const tempColor = {
    color: currentWeather.temp_f >= 90 ? "red" : "white",
  }

  const rainColor = {
    color: currentWeather.precip_in >= 1 ? "blue" : "white"
  }

  useEffect(() => {
    getCurrentWeather(props.location)
  }, [])

  return (
    <div className="current">
      <div className="header">
        <h1>Current Weather Conditions</h1>
      </div>
      <div className="enter-zip">
        <button onClick={getCurrentWeather} className="get-weather-button" >Get Weather</button>
      </div>    
      { currentWeather.temp_f ? 
      <div className="current-weather" >
        <h3 className="currently-in">Currently in {currentLocation}...</h3>
        <p style={tempColor}>Temp: {currentWeather.temp_f} degrees</p>
        <p style={tempColor}>Feels Like: {currentWeather.feelslike_f} degrees</p>
        <p>Humidity: {currentWeather.humidity}%</p>
        <p>Wind: {currentWeather.wind_dir} {currentWeather.wind_mph} mph</p>
        <p style={rainColor}>Precipitation: {currentWeather.precip_in} in</p> 
      </div> :
      <p className="please-enter" >Please enter a location</p>
      }
    </div>
  );
}

