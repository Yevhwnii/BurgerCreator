import React from 'react';

import classes from './Burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const Burger = props => {

    let transformedIngredients = Object.keys(props.ingredients) // transforms an object into array of keys
        .map(igKey => { // for every key array created with size of props.ingredients[igKey] -- which is value of key
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} /> // for every element of that array, BurgerIngredient created with type of igKey and key.
            }) 
        })
        .reduce((array, el) => { // array is accumulator which holds at start empty array, and with every execution of this callback
            // it concatanetes current array you are looping throught, el is current array of tranformedIngredients
            return array.concat(el)
        }, []); // initial value of array
  
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>
        }


    return( 
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default Burger;

/* 
This component is responsive for taking those ingredients and
and making a Burger from them, type passed in here, is received as a prop
in BurgerIngredient and goes to switch and it decides what class applied to div



*/