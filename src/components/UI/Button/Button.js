import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
    <div className={classes.Button}>
        <button className={classes.Cancel}
            onClick={props.cancled}>CANCEL</button>
        <button className={classes.Continue}
            onClick={props.continued}>CONTINUE</button>
    </div>
);

export default button;