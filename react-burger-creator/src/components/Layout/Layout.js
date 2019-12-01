import React, {ReactFragment,Component} from 'react'

import classes from './Layout.module.css'

import Aux from '../../hoc/Auxaliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component  {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }


    render() { 
        return( <Aux>
        <Toolbar open={this.sideDrawerOpenHandler}/>
        <SideDrawer 
        closed = {this.sideDrawerClosedHandler}
        open={this.state.showSideDrawer} />
        {/* <div>
            Toolbar, SideDrawer, BackDrop  UPD1 
        </div>*/}
        <main className={classes.Content}>
            {this.props.children} {/* UPD2 */}
        </main>
    </Aux>
        )
    }
} 

export default Layout

/*
UPD1: These names in main div are just placoholders for future components which
      are going to be impolemented later.
UPD2: This is the place where our Layout component is going to wrap actual page.
      So everything passed as a children to this component gonna be just wrap by Layout.
UPD3: This component is turned into class in in order to help SideDrawer with Backdrop and
      Toolbar, because they both need methods.
UPD4: Secure way of toogling the menu so that we expect a function there 
      which takes prevState as an argument and then return new state changed and then setState changes it
*/