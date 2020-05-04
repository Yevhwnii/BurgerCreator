import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    // state = { REDUX ADDED
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount()  {
    //     this.props.onInitPurhcase()
    // }
    // componentWillMount() { REDUX ADDED
    //     // extracting data from url
    //     const query = new URLSearchParams(this.props.location.search) //
    //     const ingredients = {}
    //     let price = 0
    //     for (let param of query.entries()) { // [[salad, 1], [cheese, 2] ] - what it returns
    //         if (param[0] === 'price') {
    //             price = +param[1]
    //         } else {
    //         ingredients[param[0]] = +param[1] // plus sign transforms it automatically into number
    //         } 
    //     } 
    //     this.setState({ingredients: ingredients, price: price})
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack() // goes back to the previous page in browser history stack
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    {/* <Route path={this.props.match.path + '/contact-data'}  REDUX ADDED
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={+this.state.price} {...props} />)} />  */}
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )
        }
        return summary
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurhcase: () => dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);

// Should show the summary, what user is going to buy as well as burger itself

// Render prop allows us to send ingredients to contact data and not just render a contact data

// But, if our ingredients will be null, which they are immedietly after loading Checkout component,
// and since we passing them to ContactData and extracting them there, we are getting an error.
// To fix this we changed componentDidMount to componentWillMount which will change the order of rendering 
// 

// Also we send props from Checkout component to ContactData in order to be able have an acess to history props there

// There is a problem when ingredients are loaded here first to pass them as a prop, but they are initially null so way to fix it:
// either not load checkoutSummary if there are no ings or redirect user from checkout page if there are no ings (choosen)

// Also in order to redirect user after purchasing a burger, we created interesting action called initPurchase,
// it is field in state which is initially false and changes to true whenever purchase is completed, and resets to false again
// whenever component remounted
// REMEMBER!!! since this component is main component and when we click order now we mount it,
// which means we need to implement componentDidMount here with purchased state!!
// Actually moved to click listener in burgerbuild since componentwillmount is too late, render method renders with old state
// So there it acts as a reseter for purchased state.