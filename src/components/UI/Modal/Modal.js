import React from 'react';
import classes from './Modal.module.css';
import BackDrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal = (props) => (
    <Aux>
        <BackDrop show={props.shoW}
            clicked={props.modalClosed}/>
        <div className={classes.Modal}
        style={{
            transform: props.shoW ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.shoW ? '1' : '0',
        }}>
            {props.children}
        </div>
    </Aux>
)

export default modal;