import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

const Button=styled.button`padding:5px 10px; font-size:14px; cursor:pointer; background-color:#ccc; border:none; border-radius:7px; &hover{background-color:#e69;}`;
const Container = styled.div`
text-align:center;
width:300px;
height:330px;
box-sizing:border-box;
padding:5px;
background-color:#000;
color:#fff;
`;
const LoadingSpinner = styled.div`
border:4px solid #eee;
border-top:4px solid #39b;
border-radius:50%;
width:60px; 
height:60px;
margin:0 auto;
animation:spin 2.5s linear infinite;
@keyframes spin{
    0%{ transform:rotate(0deg)}
    100%{ transform:rotate(360deg)}
}
`;
const cityMapping={
    '서울':'Seoul',
    '인천':'Incheon',
    '수원':'Suwon-si',
    '성남':'Seongnam-si',
    '고양':'Goyang-si',
    '부산':'Busan',
    '대구':'Daegu',
    '광주':'Gwangju',
    '대전':'Daejeon',
    '울산':'Ulsan',
    '세종':'Sejong',
    '강릉':'Gangneung'
}

function WeatherPage(){
    const navigate=useNavigate();
    const {region, city}=useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

useEffect(()=>{
    const fetchWeather = async () =>{
    const apiKey = '76884e5e22c3fc52ebb0258eff92d74b';
    const mappedCity=cityMapping[city] || city;
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params:{
            q:`${mappedCity},KR`,
            appid:apiKey,
            units:'metric',
            lang:'kr',
        }
        });
        setWeatherData(response.data);
    }catch (error) {
        setError("날씨 정보를 불러오는 중 오류가 발생했습니다.")
    }
};
    fetchWeather();
}, [city]);

return(
    <Container>
        {error ? (
            <p>{error}</p>
        ) : weatherData ? (
            <>
                <h2>{`${region} - ${city} 날씨 정보`}</h2>
                <p>날씨: {weatherData.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
                <p>온도: {weatherData.main.temp}°C</p>
                <p>체감온도: {weatherData.main.feels_like}°C</p>
                <p>풍속: {weatherData.wind.speed} m/s</p>
            </>
        ) : (
            <LoadingSpinner />
        )}
        <Button onClick={() => navigate(-1)}>뒤로가기</Button>
    </Container>
);
}
export default WeatherPage;