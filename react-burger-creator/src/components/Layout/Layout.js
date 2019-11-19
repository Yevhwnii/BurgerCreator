import React, {ReactFragment} from 'react'

import classes from './Layout.module.css'

import Aux from '../../hoc/Auxaliary'

const Layout = (props) => {
    return  <Aux>
        <div>
            Toolbar, SideDrawer, BackDrop {/* UPD1 */}
        </div>
        <main className={classes.Content}>
            {props.children} {/* UPD2 */}
        </main>
    </Aux>
} 

export default Layout

/*
UPD1: These names in main div are just placoholders for future components which
      are going to be impolemented later.
UPD2: This is the place where our Layout component is going to wrap actual page.
      So everything passed as a children to this component gonna be just wrap by Layout.
*/