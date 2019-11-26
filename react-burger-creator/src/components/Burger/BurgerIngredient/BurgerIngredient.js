import React from 'react'
import PropTypes from 'prop-types'

import classes from './BurgerIngredient.module.css'

const BurgerIngredient = props => {
    let ingredient = null

    switch (props.type) {
        case('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
            break
        case('meat'):
            ingredient = <div className={classes.Meat}></div>
            break
        case('cheese'):
            ingredient = <div className={classes.Cheese}></div>
            break
        case('salad'):
            ingredient = <div className={classes.Salad}></div>
            break
        case('bacon'):
            ingredient = <div className={classes.Bacon}></div>
            break
        default:
            ingredient = null
    }

    return ingredient
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired // we will get an error, using this component without type
}

export default BurgerIngredient

/*
This component is responsive for ingredients, so when we use it, we pass thru the props
type of ingredient, and inside component, based on prop passed, it return a div with styling 
for this ingredient which are held in Burger.module.css file. If no ingredient matched, null returned, and this is required field.
*/
