import React, {Component} from 'react'
import {connect} from 'react-redux'

import Aux from '../../hoc/Auxaliary'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'

// const INGREDIENT_PRICES = { redux added
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// }


export class BurgerBuilder extends Component {

    state = {
        // ingredients: null, redux added
        // totalPrice: 4,
        // purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() { // UPD6
    //     axios.get('https://react-my-burger-676bc.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         this.setState({ingredients: response.data})
    //     })
    //     .catch(error => {
    //         this.setState({error:true})
    //     })
    // }
    componentDidMount() {
        this.props.onInitIngredients()
    }


    updatePurchaseState (ingredients) { 
        
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((acc, curVal) => {
            return acc + curVal
        }, 0)
        
        return sum > 0

    }


    // addIngredientHandler = type => { REDUX ADDED
    //     const oldCount = this.state.ingredients[type]
    //     const updatedCount = oldCount + 1

    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })

    //     this.updatePurchaseState(updatedIngredients)

    // }

    // removeIngredientHandler = type => { REDUX ADDED
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount <=0) {
    //         return
    //     }
    //     const updatedCount = oldCount - 1

    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceDeduction
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })

    //     this.updatePurchaseState(updatedIngredients)
    // }

    purchaseHandler = () => {
        if (this.props.isAuth) {
        this.setState({
            purchasing: true
        })
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => { // UPD5 REDUX ADDED
        //alert('You continue!')
        // this.setState({loading:true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Breiter Yevhenii',
        //         address: {
        //             street: 'Test 1',
        //             zipCode: '20126',
        //             country: 'Poland'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        // .then(response => {
        //     this.setState({loading:false, purchasing: false})
        // })
        // .catch(error => {
        //     this.setState({ loading: false, purchasing: false }) 
        // });
        // const queryParams = []
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
        // })

    }
    render() {
        const disableInfo = { // UPD2
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.props.error ? <p>Ingredients cannot be loadded</p> : <Spinner/>
        if (this.props.ings) {
        burger = ( // UPD1
            <Aux>
                <Burger ingredients={this.props.ings} /> 
                <BuildControls
                    price={this.props.price}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    ordered={this.purchaseHandler}
                    isAuth={this.props.isAuth}
                    purchaseable={this.updatePurchaseState(this.props.ings)} />
            </Aux>
        )
        orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price} />
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
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

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
      //// Updated: now it sends all the parameters in query string. To create it we use encode and then creating it and passing as a search query
UPD6: So now, we sending GET request on our backend, and then setState to ingredients in our app.
      Then, based on fact that ingredients is not null, we do some if checks, and display dynamically and
      conditionally burger and all other components.
*/