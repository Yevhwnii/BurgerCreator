import React from 'react';

import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxaliary'

const SideDrawer = props => {

    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>
        <BackDrop  show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    )
};

export default SideDrawer;

/* 
this component is only going to be shown on mobile devices, because it has media
query which doesn`t display it on desktop. This is simply the side menu of the app

*/