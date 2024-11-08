import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WeatherPage from './components/WeatherPage';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>지역 날씨 정보</h1>
      <Home/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/weather/:region/:city' element={<WeatherPage/>}/>
      </Routes>
    </div>
  );
}
export default App;
