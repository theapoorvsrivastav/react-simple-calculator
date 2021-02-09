import React from 'react';
import './Button.css';

export const Button = (props) =>
        <button
          className={props.className}
          onClick={props.onClick.bind(null, props.value)}
        >
          {props.value}
        </button>
;

export default Button;