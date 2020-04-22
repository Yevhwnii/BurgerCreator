import React from 'react';
import {NavLink} from 'react-router-dom'

import classes from './NavigationItem.module.css'

const NavItem = props => {
    return (
        <li className={classes.NavigationItem}>
        <NavLink 
        to={props.link}
        exact
        activeClassName={classes.active}>
         {props.children}
         </NavLink>
        </li>
    )
};

export default NavItem;    

/*
This component is responsive for every single link in the toolbar, it adds styling, order them ans so on.
If anchor tag receives active class name, it also defined in css that it will have this row under it and difrrent bg.

Since "to" prop counts only prefixes we added exact prop to make it not be active when we switched path
*/