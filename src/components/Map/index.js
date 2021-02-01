import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { showDataOnMap } from '../../utils';
import './index.css';

const map = ({ countries, caseType, center, zoom }) => (
  <Map center={center} zoom={zoom}>
    <TileLayer
      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {showDataOnMap(countries, caseType)}
  </Map>
);
export default map;
