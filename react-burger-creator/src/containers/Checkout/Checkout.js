import React, {Component} from 'react';
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        // extracting data from url
        const query = new URLSearchParams(this.props.location.search) //
        const ingredients = {}
        let price = 0
        for (let param of query.entries()) { // [[salad, 1], [cheese, 2] ] - what it returns
            if (param[0] === 'price') {
                price = +param[1]
            } else {
            ingredients[param[0]] = +param[1] // plus sign transforms it automatically into number
            } 
        } 
        this.setState({ingredients: ingredients, price: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack() // goes back to the previous page in browser history stack
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        

        return (
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                 />
                <Route path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={+this.state.price} {...props} />)} /> 
            </div>
        )
    }
};

export default Checkout;

// Should show the summary, what user is going to buy as well as burger itself

// Render prop allows us to send ingredients to contact data and not just render a contact data

// But, if our ingredients will be null, which they are immedietly after loading Checkout component,
// and since we passing them to ContactData and extracting them there, we are getting an error.
// To fix this we changed componentDidMount to componentWillMount which will change the order of rendering 
// 

// Also we send props from Checkout component to ContactData in order to be able have an acess to history props there

