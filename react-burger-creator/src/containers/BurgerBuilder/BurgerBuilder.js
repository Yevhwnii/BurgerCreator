import React, {Component} from 'react'

import Aux from '../../hoc/Auxaliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((acc, curVal) => {
            return acc + curVal
        }, 0)
        
        this.setState({
            purchaseable: sum > 0 ? true : false
        })

    }


    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients)

    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <=0) {
            return
        }
        const updatedCount = oldCount - 1

        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })

        this.updatePurchaseState(updatedIngredients)
    }

    render() {
        const disableInfo = { // UPD2
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Aux>
                <Burger  ingredients={this.state.ingredients}  /> {/* UPD1 */}
                <BuildControls
                price = {this.state.totalPrice}
                ingredientAdded={this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled = {disableInfo}
                purchaseable={this.state.purchaseable} />
            </Aux>
        )
    }
}

export default BurgerBuilder

/*
UPD1: div with Burger will be replaced by the Burger component with graphical
      represantation of the burger. And Build Controls will be replaced with BuildCOntrols
      component with button to add or remove components.

UPD2: disabled info, after looping is just object with keys of type of ingredients and 
      values either true of false, because we assigned it to condition of disabledInfo[key] <= 0
      Then it forwards to burgerControl and simply adds HTML attribute which disables button with css styling.
      This works because when state is updated the whole render method is executed again, so disabledInfo also gets
      refreshed.
*/