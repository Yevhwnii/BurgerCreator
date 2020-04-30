import React from 'react';

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Button from '../../UI/Button/Button'
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle'

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToogle clicked={props.open}/>
            <div className={classes.Logo}>
                <Logo  />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthehticated = {props.isAuth} />
            </nav>
        </header>
    )
};

export default Toolbar;

/* 
Trick with Desktop only is very simple, we just apply display none if device is
mobile otherwise nothing changes.

*/