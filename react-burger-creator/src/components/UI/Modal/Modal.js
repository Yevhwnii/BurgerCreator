import React, {Component} from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxaliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component  {

    shouldComponentUpdate(nextProps, nextState) { // UPD1
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children // UPD2
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}

                </div>

            </Aux>
        )
    }

    
};

export default Modal;

/* 
This component is responsive for that notification that pops up when you click
Order Now button. Actually the Modal component itself is just a Box with some styling
that just wrap the real information that gets passed in as a child.

UPD1: Parent component controls the update of child

UPD2: Updated the rule. Now it is also updating not only when props.show is changed but also when 
      its child is changed, because we also pass a spinner there.

*/