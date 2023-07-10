import React, { useState, useEffect } from 'react';

export function History(props) {
  const [ history, setHistory ] = useState([])
  const [ historyDate, setHistoryDate ] = useState('')
  
  const getHistory = async () => {
    if (props.location && historyDate.length === 10) {
        const location = props.location
        const date = historyDate
        const url = `http://api.weatherapi.com/v1/history.json?key=75c17c8587e14a89a0113348230907&q=${location}&dt=${date}`
        const response = await fetch(url);
        const responseJSON = await response.json();
        const first = responseJSON.forecast
        const second = first.forecastday
        const historicalData = second[0].day

        if (historicalData) {
        setHistory(historicalData)
            }
        }
    }

  useEffect(() => {
    getHistory(props.location, historyDate)
  }, [])
  
  function getMonthName(monthNumber) {
      const date = new Date();
      date.setMonth(monthNumber - 1);
      return date.toLocaleString('en-US', {month: 'long'})
    }
    
    function getCorrectDate(historyDate) {
        let year = historyDate.substring(0,4);
        let monthNumber = historyDate.substring(5,7);
        let day = historyDate.substring(8,10);
        return `${getMonthName(monthNumber)} ${day}, ${year}`
  }

  const tempColor = {
    color: history.maxtemp_f >= 90 ? "red" : "white",
  }

  const rainColor = {
    color: history.totalprecip_in >= 1 ? "blue" : "white"
  }

  return (
    <div className="history">
      <div className="header">
        <h1>Historical Weather</h1>
      </div>
      <div className="enter-zip">
        <input type="text" className="date-input" placeholder="2023-01-01" onChange={(event) => setHistoryDate(event.target.value)} />
        <br/>
        <button onClick={getHistory} className="get-weather-button" >Get Weather</button>
      </div>
      { history.maxtemp_f ? 
      <div className="historical-weather" >
        <h3 className="history-date">{getCorrectDate(historyDate)}</h3>
        <p style={tempColor}>High Temp: {history.maxtemp_f} degrees</p>
        <p>Low Temp: {history.mintemp_f} degrees</p>
        <p>Humidity: {history.avghumidity}%</p>
        <p style={rainColor}>Precipitation: {history.totalprecip_in} in</p> 
      </div> :
      <p className="please-enter" >Please enter a location and previous date (within the past year)</p>
      }
    </div>
  );
}

