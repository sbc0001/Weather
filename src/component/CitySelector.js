import React from 'react';

function CitySelector({citiesRegion, selectedRegion, setSelectedRegion}){

const regionChange=(e)=>{
    const region=e.target.value;
    setSelectedRegion(region);
}
    return(
        <div>
            <select value={selectedRegion} onChange={regionChange}>
                <option value="">지역 선택</option>
                {
                    Object.keys(citiesRegion).map((region)=>(
                        <option key={region} value={region}>{region}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default CitySelector;