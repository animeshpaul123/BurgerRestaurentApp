import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import YourIngredients from '../../components/Burger/OrderSummery/OrderSummery';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

const INDREDIENTS_PRICE = {
    cheese: 1.5,
    meat: 2.05,
    salad: 1,
    bacon: 3
}
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            cheese: 0,
            salad: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }
    clearBackdropHandler = () => {
        this.setState({purchasing: false})
    }
    cancelHandler = () => {
        this.setState({purchasing: false})
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
        return (
            <Aux>
                <Backdrop show={this.state.purchasing}
                    clicked={this.clearBackdropHandler}/>
                <Modal show={this.state.purchasing}>
                    <YourIngredients ingredients={this.state.ingredients}
                        cancle={this.cancelHandler}
                        continue={this.continuehandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addedIngredients={this.addIngredientsHandler} 
                    removedIngredients={this.removeIngredientsHandler} 
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;