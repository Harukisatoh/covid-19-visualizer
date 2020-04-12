import React, { useState } from 'react';

import './index.css';

export default function RadioMenu(props) {
  const [selectedOption, setSelectedOption] = useState(props.options[0]);

  function handleChange(option, setMapOption) {
    setSelectedOption(option);
    setMapOption(option);
  }

  return (
    <div className="RadioMenu" >
      <label>Marker options:</label>
      {props.options.map((option, index) => (
        <div className="RadioOption" key={index}>
          <input
            id={option}
            type='radio'
            name='radioOptions'
            value={option}
            checked={selectedOption === option}
            onChange={() => handleChange(option, props.onChange)}
            className='RadioInput'
          />
          <label htmlFor={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
        </div>
      ))}
    </div >
  );
}