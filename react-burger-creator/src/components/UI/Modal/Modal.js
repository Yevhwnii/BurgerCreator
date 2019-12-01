import React from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxaliary'
import Backdrop from '../Backdrop/Backdrop'

const Modal = props => {

    return (
        <Aux>
        <Backdrop show = {props.show} clicked={props.modalClosed}  />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'traslateY(0)' : 'traslateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}

            </div>

        </Aux>
    )
};

export default Modal;

/* 
This component is responsive for that notification that pops up when you click
Order Now button. Actually the Modal component itself is just a Box with some styling
that just wrap the real information that gets passed in as a child.

*/