import React from 'react';
import WeatherPage from './WeatherPage';

function Home(){
    const citiesRegion={
        서울:['서울'],
        인천:['인천'],
        경기:['수원', '성남', '고양'],
        부산:['부산', '서면'],
        대구:['대구'],
        울산:['울산'],
        세종:['세종'],
        광주:['광주'],
        대전:['대전'],
    }
return(
    <div>
    {
        Object.keys(citiesRegion).map((region)=>(
            citiesRegion[region].map((city)=>
                <WeatherPage key={`${region}-${city}`} region={region} city={city}/>
            )
        ))
    }
    </div>
)
}
export default Home;