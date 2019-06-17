import React from 'react';
import classes from './Logo.module.css';
import LogoImg from './Images/logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={LogoImg} alt="logo"/>
    </div>
);

export default logo;