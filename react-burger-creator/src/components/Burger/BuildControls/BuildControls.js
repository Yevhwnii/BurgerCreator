import React from 'react';

import classes from './BuildControl.module.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    {label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]


const BuildControls = props => {

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
            {controls.map((ctrl) => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]} /> // UPD1
            ))}
            <button className={classes.OrderButton}
             disabled={!props.purchaseable}
             onClick={props.ordered} >{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    )

};

export default BuildControls;

/*
This component takes into account how much build controls there are, and gather
all thoose BuildControl component into one and output them with bg color and some styling.
So this is just holder for all BuildControl components.

UPD1: We need to pass this reference into desired button. So we put there an reference
to that handler, with will execute on desired type, because we passed that in (ctrl.type).


*/