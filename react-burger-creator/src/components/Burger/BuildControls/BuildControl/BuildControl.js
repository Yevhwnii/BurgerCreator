import React from 'react';

import classes from './BuildControl.module.css'

const BuildControl = props => {

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>
        </div>
    )
};

export default BuildControl;

/*
This component is responsive for BuildControl itself, the buttons and label attached
to them. Clicking on More button, increments related value in ingredients object in main state,
Less button do the opposite.

UPD1: Whenever ingredient is added (state is changed), because onClick listener on button here
gets the reference to addIngredientHandler in BurgerCreator.js, new updated state is checked, 
and therefore one more ingredient is rendered in Burger.js (there is an array of BurgerIngredient components.)


*/