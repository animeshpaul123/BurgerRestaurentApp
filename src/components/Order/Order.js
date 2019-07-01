import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = []
    for (let key in props.ingredients) {
        ingredients.push({
            name: key,
            count: props.ingredients[key]
        })
    }
    let newIngredients = ingredients.map(ig => {
        return <span style={{
            background: ig.count <=1 ? 'rgb(224, 229, 227)' : '#3ee1a7',
            display: 'inline-block',
            padding: '2px 5px',
            margin: '0 10px',
            borderRadius: '2px',
        }}>{ig.name}: ({ig.count})</span>
    })
    console.log('aaaaaa', ingredients)
    return (
        <div className={classes.Order}>
            <p>Ingredients: {newIngredients}</p>
            <p>price <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;