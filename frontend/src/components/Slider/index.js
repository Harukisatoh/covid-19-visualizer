import React, { useState } from 'react';

import './index.css';

function handleChange(e, setValue, onChangeFunction) {
  setValue(e.target.value);
  onChangeFunction(e.target.value);
}

export default function Slider(props) {
  const [value, setValue] = useState(0);
  return (
    <div className="SliderContainer">
      <label htmlFor='slider'>Day(since {props.firstDayDate}):</label>
      <input
        id='slider'
        className="Slider"
        type="range"
        min="0" max={props.totalDays - 1}
        value={value}
        onChange={(e) => handleChange(e, setValue, props.onChange)}
        step="1"
      />
      <span className="SliderValue">{value}</span>
    </div>
  );
}