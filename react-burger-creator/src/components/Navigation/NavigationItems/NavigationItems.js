import React from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>
        </ul>
    )
};

export default NavItems;

/*
This component is responsive for correct styling of its childs, padding them, keeping in flexbox and so on

*/