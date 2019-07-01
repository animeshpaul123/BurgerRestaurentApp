import React, { Component } from 'react';
import classes from './ContactForm.module.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinners/Spinner';

class ContactForm extends Component {
    state = {
        order: {
            ingredients: null,
            price: null,
            customer: {
                name: null,
                address: null,
            },
            deliveryMethod: null,
        },
        loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        console.log(this.props)
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Animesh Paul',
                address: {
                    street: 'Btm, Bangalore',
                    phone: 9090909090,
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false})
                console.log(response, this.state)
                this.props.history.replace('/orders')
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }
    render () {
        let form = (
            <form>
                <input type="text" name="name"/>
                <input type="email" name="email"/>
                <input type="text" name="address"/>
                <input type="number" name="phone number"/>
                <button onClick={this.orderHandler}>order</button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactForm}>
                <h1>please,fill your details here</h1>
                {form}
            </div>
        )
    }
}
export default ContactForm;