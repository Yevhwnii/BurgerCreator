import React from 'react';

import classes from './Backdrop.module.css'

const Backdrop = props => {
    return (
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
    )
};

export default Backdrop;

/* 
This component is in response of these black screen when you click Order Now
with opacity 0.5. So when you click it it disappears.

*/