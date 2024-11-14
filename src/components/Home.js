import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CitySelector from './CitySelector';
import styled from 'styled-components';

const Container = styled.div`
text-align:center;
width:300px;
height:auto;
box-sizing:border-box;
padding:5px;
background-color:#ccc;
color:#333;
`;

const citiesRegion = {
    서울: ['서울'],
    인천: ['인천'],
    경기: ['수원', '성남', '고양'],
    부산: ['부산'],
    대구: ['대구'],
    울산: ['울산'],
    세종: ['세종'],
    광주: ['광주'],
    대전: ['대전'],
    강릉: ['강릉']
};


function Home(){
    const navigate=useNavigate();
    const [selectedRegion, setSelectedRegion]=useState('');

    const handleCityClick=(city)=>{
        navigate(`/weather/${selectedRegion}/${city}`);
    }

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
                    <h2>{selectedRegion}의 도시 목록</h2>
                    {citiesRegion[selectedRegion].map((city) => (
                        <div 
                            key={city} 
                            style={{ marginBottom: '20px', cursor: 'pointer' }}
                            onClick={() => handleCityClick(city)}
                        >
                            <h3>{city}</h3>
                        </div>
                    ))}
                </div>
            )}
        </Container>
    );
}


export default Home;