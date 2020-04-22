import React from 'react';

import classes from './Button.module.css'

const Button = props => {
    return (
        <button
        disabled = {props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
         onClick={props.clicked}>{props.children}</button>
    )
};

export default Button;

/* 
Custom Button component. Requires as props: on click listener, and button type 
either Success or Danger. Because styling in css file is applied based on this class.
Like we have default .Button class which is joined with either .Success or .Danger with .join method.
*/