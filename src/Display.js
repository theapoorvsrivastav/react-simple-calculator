import React from 'react';
import './Display.scss';

export const Display = (props) =>(
  <div className="display">
    <span className="displaySpan">{props.display}</span>
  </div>
);

export default Display;
