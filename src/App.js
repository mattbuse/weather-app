import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar';
import { Current } from './components/Current';
import { Forecast } from './components/Forecast';
import { History } from './components/History.jsx';
import { useState } from 'react'
import './App.css';


function App() {
  const [ location, setLocation ] = useState('')

  return (
    <div className="App">
      <div className="app-header-container">
        <h1 className="app-name">Matt's Weather App</h1>
        <div className="location-container">
          <label className="label" >Enter a location</label>
          <input type="text" className="location-box" placeholder="City or zip code..." onChange={(event) => setLocation(event.target.value)} />
        </div>
      </div>
      <NavBar />
        <Routes>
          <Route path='/' element={<Current location={location}/>} />
          <Route path='/current' element={<Current location={location}/>} />
          <Route path='/forecast' element={<Forecast location={location}/>} />
          <Route path='/history' element={<History location={location}/>} />
        </Routes>
    </div>
  );
}

export default App;

