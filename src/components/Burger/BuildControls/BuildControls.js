import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <h3>Current Price: <strong>${props.price.toFixed(2)}</strong></h3>
        {controls.map(item => (
            <BuildControl 
                key={item.label} 
                label={item.label} 
                added={props.addedIngredients.bind(this, item.type)}
                removed={props.removedIngredients.bind(this, item.type)}
                disabled={props.disabled[item.type]}/>
        ))}
        <button className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>Order Now</button>
    </div>
);

export default buildControls;