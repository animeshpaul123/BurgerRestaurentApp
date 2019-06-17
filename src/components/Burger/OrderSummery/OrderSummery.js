import React from 'react';
import Aux from '../../../hoc/AuxFile/Aux';
import Buttons from '../../UI/Button/Button';

const orderSummmery = (props) => {
    const yourIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return <li><span style={{textTransform: 'capitalize'}}>{igKey}</span> {props.ingredients[igKey]}</li>
        })
    return (
        <Aux>
            <h3>Your Order Summery</h3>
            <p>A delicious Burger with the following ingredients</p>
            <ul>
                {yourIngredients}
            </ul>
            <p>Ready to cheakout?</p>
            <Buttons cancled={props.cancle}
                continued={props.continue}/>
        </Aux>
    );
}

export default orderSummmery;