import React from 'react';

import './index.css'

export default function Report(props) {
  return (
    <div className="Report">
      <h2>{props.title}</h2>
      <div>
        <small>Confirmed: </small>
        <small>{props.data['confirmed']}</small>
      </div>
      <div>
        <small>Deaths: </small>
        <small>{props.data['deaths']}</small>
      </div>
      <div>
        <small>Recovered: </small>
        <small>{props.data['recovered']}</small>
      </div>
    </div>
  );
}