import React from 'react';

import classes from './NavigationItem.module.css'

const NavItem = props => {
    return (
        <li className={classes.NavigationItem}>
        <a href={props.link} className={props.active ? classes.active : null}>{props.children}</a>
        </li>
    )
};

export default NavItem;    

/*
This component is responsive for every single link in the toolbar, it adds styling, order them ans so on.
If anchor tag receives active class name, it also defined in css that it will have this row under it and difrrent bg.


*/