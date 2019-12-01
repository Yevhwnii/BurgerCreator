import React from 'react';

import classes from './Logo.module.css'
import logo from '../../assets/images/burger-logo.png'

const Logo = props => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={logo} alt="My Burger" />
        </div>
    )
};

export default Logo;

/*
Though we cannot simply add directory of image into src attribute, because
when it will come to production, webpack will bundle all our code and create
different folder for this, we can import it like we do with css modules. This 
will be a string to the path of this image.

*/