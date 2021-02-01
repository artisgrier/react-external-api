import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';
import './index.css';

const caseTypeColors = {
  cases: {
    hex: '#cc1034',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
};

export const sortData = (data) =>
  [...data].sort((a, b) => (a.cases > b.cases ? -1 : 1));

export const prettyPrintStat = (stat) =>
  stat && `+${numeral(stat).format('0.0a')}`;

export const showDataOnMap = (data, caseType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={caseTypeColors[caseType].hex}
      fillColor={caseTypeColors[caseType].hex}
      radius={
        Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
      }
    >
      <Popup>
        <div className='info_conatiner'>
          <div
            className='info_flag'
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          />
          <div className='info_name'>{country.country}</div>
          <div className='info_cases'>
            Cases: {numeral(country.cases).format('0,0')}
          </div>
          <div className='info_recovered'>
            Recoverd: {numeral(country.recovered).format('0,0')}
          </div>
          <div className='info_deaths'>
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
