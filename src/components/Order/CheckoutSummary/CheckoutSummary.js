import React from 'react';
import Burger from '../../Burger/Burger';
import Buttons from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>hope, it tastes good</h1>
            <div style={{width: '100%', height: '300px'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div className={classes.buttons}>
                <Buttons cancled={props.checkoutCancled}
                    continued={props.checkoutContinued}/>
            </div>
        </div>
    )
}

export default checkoutSummary;