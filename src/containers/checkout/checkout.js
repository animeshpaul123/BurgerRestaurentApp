import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from '../ContactForm/ContactForm';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0,
        },
        totalPrice: 0,
    }
    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = +param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ingredients: ingredients, totalPrice: price})
    }
    checkoutCancledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact');
    }
    render () {
        console.log(this.props)
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                    checkoutCancled={this.checkoutCancledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + "/contact"} 
                render={(props) => (<ContactForm ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
            </div>
        )
    }
}

export default  Checkout;