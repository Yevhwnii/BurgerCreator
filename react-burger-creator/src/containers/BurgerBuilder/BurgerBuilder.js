import React, {Component} from 'react'

import Aux from '../../hoc/Auxaliary'

class BurgerBuilder extends Component {




    render() {
        return (
            <Aux>
                <div>Burger</div> {/* UPD1 */}
                <div>Build Controls</div>
            </Aux>
        )
    }
}

export default BurgerBuilder

/*
UPD1: div with Burger will be replaced by the Burger component with graphical
      represantation of the burger. And Build Controls will be replaced with BuildCOntrols
      component with button to add or remove components.
*/