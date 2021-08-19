import React from "react";

import { Popup, Circle } from "react-leaflet";

import Report from "../Report";

import "./index.css";

export default function CustomCircleMarker(props) {
  function normalizeRadius(currentCasesNumber) {
    const maxCircleSize = 800000; // In meters, which means it's 800 km
    const ratio = Math.sqrt(props.maxCases[props.option]) / maxCircleSize;

    const radius = Math.sqrt(currentCasesNumber) / ratio;

    return radius !== Infinity ? radius : 0;
  }

  function bindPopup() {
    return (
      <Popup className="Popup" maxWidth={500}>
        <h1>{props.country}</h1>

        <div className="ReportsGroup">
          <Report
            title="Total until this moment:"
            data={props.countryData["report"]}
          />
        </div>
      </Popup>
    );
  }

  return (
    <Circle
      key={props.index}
      color="red"
      radius={normalizeRadius(props.countryData["report"][props.option])}
      center={{ lat: props.countryData["lat"], lng: props.countryData["long"] }}
    >
      {bindPopup()}
    </Circle>
  );
}
