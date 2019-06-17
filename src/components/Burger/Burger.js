import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import classes from './Burger.module.css';

const burger = (props) => {
    let transIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map( (_, i) => {
                return <BurgerIngredients key={igKey + i} type={igKey} />;
            });
        }).reduce((acc, next) => {
            return acc.concat(next);
        },[]);
        if (transIngredients.length === 0) {
            transIngredients = <div> please, add ingredients</div>
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type='bread-top'/>
            {transIngredients}
            <BurgerIngredients type='bread-bottom'/>
        </div>
    );
}

export default burger;