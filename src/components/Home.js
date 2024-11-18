import React, {useState} from 'react';
import CitySelector from './CitySelector';
import styled from 'styled-components';
import WeatherPage from './WeatherPage';

const Container = styled.div`
text-align:center;
background-color:#ededed;
color:#333;
`;

const citiesRegion = {
    서울: ['서울'],
    인천: ['인천'],
    부산: ['부산'],
    대전: ['대전'],
    대구: ['대구'],
    광주: ['광주'],
    울산: ['울산'],
    경기: ['수원', '성남', '고양','용인','안산','안양','부천','남양주','화성'],
    강원: ['춘천','원주','강릉'],
    충북: ['청주','충주'],
    충남: ['천안','아산','서산'],
    전북: ['전주','익산','군산'],
    전남: ['목포','여수','순천'],
    경북: ['포항','경주','구미'],
    경남: ['창원','진주','김해'],
    제주: ['제주']
};


function Home(){
    const [selectedRegion, setSelectedRegion]=useState('');

    return (
        <Container>
            <h1>지역을 선택 해주세요.</h1>
            <CitySelector
                citiesRegion={citiesRegion}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
            />

                {selectedRegion && (
                <div>
                    <div className='h2container'>
                        <h2>{selectedRegion}의 도시 날씨정보</h2>
                    </div>
                    
                    {citiesRegion[selectedRegion].map((city) => (
                        <WeatherPage 
                            key={`${selectedRegion}-${city}`}
                            region={selectedRegion}
                            city={city}
                        />
                    ))}
                </div>
            )}
        </Container>
    );
}


export default Home;