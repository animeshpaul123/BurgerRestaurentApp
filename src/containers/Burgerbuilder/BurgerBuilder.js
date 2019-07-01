import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import YourIngredients from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinners/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INDREDIENTS_PRICE = {
    cheese: 1.5,
    meat: 2.05,
    salad: 1,
    bacon: 3
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        statement: false,
        error: null,
    }
    componentDidMount () {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
                console.log(res)
                this.isItPurchasable(this.state.ingredients)
            })
            .catch(err => {
                this.setState({error: err})
            })
    }
    clearBackdropHandler = () => {
        this.setState({purchasing: false})
    }
    cancelHandler = () => {
        this.setState({purchasing: false})
    }
    continuehandler = () => {
        // alert('you continue!')
        
        const ingredients = [];
        for (let i in this.state.ingredients) {
            ingredients.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        ingredients.push('price=' + this.state.totalPrice);
        const queryString = ingredients.join("&");
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });

    }
    purchasingHandler = () => {
        this.setState({purchasing: true});
    }
    isItPurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((acc, next) => {
                return acc + next;
            }, 0)
        this.setState({purchasable: sum > 0})
    }
    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const totalPrice = this.state.totalPrice;
        const priceAddition = INDREDIENTS_PRICE[type];
        const currentPrice = totalPrice + priceAddition;
        this.setState({
            totalPrice: currentPrice,
            ingredients: updatedIngredients
        })
        this.isItPurchasable(updatedIngredients);
    }
    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const totalPrice = this.state.totalPrice;
        const priceDeduction = INDREDIENTS_PRICE[type];
        const currentPrice = totalPrice - priceDeduction;
        this.setState({
            totalPrice: currentPrice,
            ingredients: updatedIngredients
        })
        this.isItPurchasable(updatedIngredients);
    }
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderStatement = this.state.statement? 
            <div style={{width: '50%',
                        textAlign: 'center',
                        margin: '0 auto 20px',
                        padding: '20px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'green',
                        }}>Your order has been placed successfully!</div>: null;

        let ingredients = null;
        
        let burger = this.state.error?  <p>page can not be loaded...</p>: <Spinner />;

        if (this.state.ingredients) {
            burger = <Aux>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls addedIngredients={this.addIngredientsHandler} 
                            removedIngredients={this.removeIngredientsHandler} 
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchasable={this.state.purchasable}
                            ordered={this.purchasingHandler}/>
                    </Aux>
                ingredients = <YourIngredients ingredients={this.state.ingredients}
                cancle={this.cancelHandler}
                continue={this.continuehandler}/>
        }
        if (this.state.loading) {
            ingredients = <Spinner />
        }
        return (
            <Aux>
                <Modal shoW={this.state.purchasing}
                    modalClosed={this.clearBackdropHandler}>
                    {ingredients}
                </Modal>
                {burger}
                {orderStatement}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);