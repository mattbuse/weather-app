import React from 'react';

export function ForecastData(props) {
    const { forecast } = props;
    const temps = forecast.day;

    console.log(temps); 

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
    color: temps.maxtemp_f >= 90 ? "red" : "white",
  }

  const rainColor = {
    color: temps.daily_chance_of_rain >= 50 ? "blue" : "white"
  }

  const dateSize = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: 'rgb(62, 10, 158)',
  }

return (
    <div className="forecast-box">
      <div className="forecast-data">
        <p style={dateSize}>{getCorrectDate(forecast.date)}</p>
        <p style={tempColor}>High: {temps.maxtemp_f}</p>
        <p>Low: {temps.mintemp_f}</p>
        <p>Humidity: {temps.avghumidity}%</p>
        <p style={rainColor}>Chance of Rain: {temps.daily_chance_of_rain}%</p>
        <p>Wind: {temps.maxwind_mph} mph</p>
      </div>
    </div>
  );
}

