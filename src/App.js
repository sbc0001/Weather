import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WeatherPage from './component/WeatherPage';
import Home from './component/Home';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>지역 날씨 정보</h1>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/weather/:region/:city' element={<WeatherPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
