import React from 'react';

import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const NavItems = props => {
    
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuthehticated ?
            <NavigationItem link="/orders">Orders</NavigationItem>
            : null}
            {!props.isAuthehticated ?
             <NavigationItem link="/auth">Authenticate</NavigationItem>
              : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    )
};

export default NavItems;

/*
This component is responsive for correct styling of its childs, padding them, keeping in flexbox and so on

*/