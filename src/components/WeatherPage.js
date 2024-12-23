import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
text-align:center;
width:290px;
height:290px;
box-sizing:border-box;
padding:5px;
background-color:#ccc;
color:#333;
border-radius:20px;
box-shadow:5px 4px 3px rgba(0,0,0,0.3), 5px 4px 3px rgba(255,255,255,1) inset;
transition:all .4s ease;
font-weight:bold;
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
    '용인':'Yongin',
    '안산':'Ansan',
    '안양':'Anyang',
    '부천':'Bucheon',
    '남양주':'Namyangju',
    '화성':'Hwaseong',
    '부산':'Busan',
    '대구':'Daegu',
    '대전':'Daejeon',
    '광주':'Gwangju',
    '울산':'Ulsan',
    '춘천':'Chuncheon',
    '원주':'Wonju',
    '강릉':'Gangneung',
    '청주':'Cheongju',
    '충주':'Chungju',
    '천안':'Cheonan',
    '아산':'Asan',
    '서산':'Seosan',
    '전주':'Jeonju',
    '익산':'Iksan',
    '군산':'Gunsan',
    '목포':'Mokpo',
    '여수':'Yeosu',
    '순천':'Suncheon',
    '포항':'Pohang',
    '경주':'Gyeongju',
    '구미':'Gumi',
    '창원':'Changwon',
    '진주':'Jinju',
    '김해':'Gimhae',
    '제주':'Jeju',
}

function WeatherPage({ region, city }){
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

useEffect(()=>{
    const fetchWeather = async () =>{
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
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

if (error) return <Container><p>{error}</p></Container>;
if (!weatherData) return <Container><LoadingSpinner /></Container>;

return(
    <Container>
        {error ? (
            <p>{error}</p>
        ) : weatherData ? (
            <>
                <h2>{`${region} - ${city} 날씨 정보`}</h2>
                <p>날씨 : {weatherData.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}/>
                <p>온도 : {weatherData.main.temp}°C</p>
                <p>체감온도 : {weatherData.main.feels_like}°C</p>
                <p>풍속 : {weatherData.wind.speed} m/s</p>
            </>
        ) : (
            <LoadingSpinner />
        )}
    </Container>
);
}
export default WeatherPage;