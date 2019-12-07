import React, {Component} from 'react'

import Aux from '../../hoc/Auxaliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() { // UPD6
        axios.get('https://react-my-burger-676bc.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error:true})
        })
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

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => { // UPD5
        //alert('You continue!')
        this.setState({loading:true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Breiter Yevhenii',
                address: {
                    street: 'Test 1',
                    zipCode: '20126',
                    country: 'Poland'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading:false, purchasing: false})
        })
        .catch(error => {
            this.setState({ loading: false, purchasing: false }) 
        });

    }
    render() {
        const disableInfo = { // UPD2
            ...this.state.ingredients
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Ingredients cannot be loadded</p> : <Spinner/>
        if (this.state.ingredients) {
        burger = ( // UPD1
            <Aux>
                <Burger ingredients={this.state.ingredients} /> 
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    ordered={this.purchaseHandler}
                    purchaseable={this.state.purchaseable} />
            </Aux>
        )
        orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            
            <Aux>
                <Modal show={this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);

/*
UPD1: div with Burger will be replaced by the Burger component with graphical
      represantation of the burger. And Build Controls will be replaced with BuildCOntrols
      component with button to add or remove components.

UPD2: disabled info, after looping is just object with keys of type of ingredients and 
      values either true of false, because we assigned it to condition of disabledInfo[key] <= 0
      Then it forwards to burgerControl and simply adds HTML attribute which disables button with css styling.
      This works because when state is updated the whole render method is executed again, so disabledInfo also gets
      refreshed.

UPD3: We use updateState method in our handlers, so in order to not come across with situation when we receive there
      an old list of ingredients, as soon as we update it in handler, we pass it to the updatedState method, which in
      its turn do this update check and decides wheather or not button should be disabled.

UPD4: Button blinks because, whenever purchaseable becomes true, it is passed to BuildControls component,
      and then into disabled attribute of the button. Then in css file we have :not(:disabled) statement which mean
      whenever button gets out of disabled contidion it blinks.

UPD5: Since firebase is using MongoDB like database, we can simply add to url something and it will automatically 
      create node for us and store it there. So there we create our order object, which gets filled with data from state,
      and then we send it to the database which generates id automatically for it and store as json objects. .json in URL should 
      be always added!!!
UPD6: So now, we sending GET request on our backend, and then setState to ingredients in our app.
      Then, based on fact that ingredients is not null, we do some if checks, and display dynamically and
      conditionally burger and all other components.
*/