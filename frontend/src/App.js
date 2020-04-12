import React, { useEffect, useState, useRef } from 'react';

import { Map, TileLayer, LayersControl, FeatureGroup, MapControl } from 'react-leaflet';

import api from './services/api'

import './App.css';
import CustomCircleMarker from './components/CustomCircleMarker';
import Slider from './components/Slider';
import RadioMenu from './components/RadioMenu';

export default function App() {

  const mapRef = useRef(null);
  const [covidData, setCovidData] = useState({});
  const [dayDate, setDayDate] = useState('');
  const [firstDayDate, setFirstDayDate] = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [day, setDay] = useState(0);
  const [maxCases, setMaxCases] = useState({ confirmed: 0, deaths: 0, recovered: 0 });
  const [option, setOption] = useState('recovered');

  useEffect(() => {

    api.get(`/report/${day}`).then(response => {
      setFirstDayDate(response.headers['x-first-day-date']);
      setDayDate(response.headers['x-day-date']);
      setTotalDays(response.headers['x-total-days']);

      const aux = {
        confirmed: response.headers['x-max-confirmed-case'],
        deaths: response.headers['x-max-deaths-case'],
        recovered: response.headers['x-max-recovered-case']
      }
      setMaxCases(aux);

      setCovidData(response.data);
    });

  }, [day]);

  function renderCircularMarkers() {
    return Object.keys(covidData).map((country, index) => (
      covidData[country]['report'][option] !== 0 &&
      <CustomCircleMarker
        key={index}
        index={index}
        countryData={covidData[country]}
        maxCases={maxCases}
        dayDate={dayDate}
        firstDayDate={firstDayDate}
        country={country}
        option={option}
      />
    ))
  }

  return (
    <div className="ContentContainer">
      <div className="Logo">
        <h1>COVID-19</h1>
        <h2>Visualizer</h2>
      </div>
      <div className="MapDiv">
        <Map
          ref={mapRef}
          className="Map"
          center={[0, 0]}
          zoom='2'
          maxBounds={[[-90, -200], [90, 270]]}
          maxBoundsViscosity='0.95'
        >

          <TileLayer
            url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
            accessToken="pk.eyJ1IjoiaGFydWtpc2F0b2giLCJhIjoiY2s4ZXJ0ajJ2MDBreTNrcWsyb3Y4dHVnbSJ9.lhrDlNEMjraiQMrbu9S5Ww"
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            id="mapbox/dark-v10"
            maxZoom="18"
            minZoom="2"
          />

          <LayersControl position='topright'>
            <LayersControl.BaseLayer name="Circular markers" checked={true}>
              <FeatureGroup>
                {
                  renderCircularMarkers()
                }
              </FeatureGroup>
            </LayersControl.BaseLayer>
          </LayersControl>
        </Map>
      </div>
      <div className="MenuDiv">
        <Slider
          onChange={setDay}
          firstDayDate={firstDayDate}
          totalDays={totalDays}
        />
        <RadioMenu
          options={['confirmed', 'deaths', 'recovered']}
          onChange={setOption}
        />
      </div>
    </div >
  );
}
