
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
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
const cityMapping = {
'서울':'Seoul',
'강남':'Gangnam',
'인천':'Incheon',
'경기':'Gyeonggi',
'수원':'Suwon-si',
'성남':'Seongnam-si',
'고양':'Goyang-si',
'부산':'Busan',
'서면':'Seomyeon',
'대구':'Daegu',
'광주':'Gwangju',
'대전':'Daejeon',
'울산':'Ulsan',
'세종':'Sejong',
'강릉':'Gangerung',
}
function WeatherPage({region, city}){
const [weatherData, setWeatherData] = useState(null);
useEffect(()=>{
    const fetchWeather = async () =>{
    const apiKey = '76884e5e22c3fc52ebb0258eff92d74b';
    const mappedCity = cityMapping[city] || city;
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
        if (error.response) {
            alert(error.response.data.message || "서버에서 오류가 발생했습니다.");
        } else if (error.request) {
            alert("서버에 연결할 수 없습니다. 네트워크를 확인하세요.");
        } else {
            alert("오류 발생: " + error.message);
        }
    }
};
    fetchWeather();
}, [city])
return(
    <Container>
    <h1>{`${region}지역 - ${city}시의 날씨 정보`}</h1>
    {weatherData ? (
        <div>
        <h2>{weatherData.weather[0].description}</h2>
        <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
        <p><strong>{new Date().toLocaleDateString()}</strong></p>
        <p>온도 : {weatherData.main.temp}&deg;C </p>
        <p>체감온도 : {weatherData.main.feels_like}°C </p>
        <p>풍속 : {weatherData.wind.speed} m/s</p>
        </div>
    ) : (
        <div>
        <LoadingSpinner />
        <p>날씨 정보를 불러오는 중입니다...</p>
        </div>
    )}
    </Container>
)
}
export default WeatherPage;