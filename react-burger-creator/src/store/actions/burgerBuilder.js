import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
         payload: { 
             ingredientName: ingName
        } 
    }
}

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {
            ingredientName: ingName
        }
    }
}


export const setIngredinets = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: {
            ingredients: ingredients
        }
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-676bc.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredinets(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}