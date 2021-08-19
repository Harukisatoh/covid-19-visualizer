import React, { useState } from "react";

import "./index.css";

export default function Slider(props) {
  const [value, setValue] = useState(0);

  function handleChange(newValue) {
    setValue(newValue);
    props.onChange(newValue);
  }

  return (
    <div className="SliderContainer">
      <label htmlFor="slider">Day(since {props.firstDayDate}):</label>
      <input
        id="slider"
        className="Slider"
        type="range"
        min="0"
        max={props.totalDays}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        step="1"
      />
      <span className="SliderValue">{value}</span>
    </div>
  );
}
