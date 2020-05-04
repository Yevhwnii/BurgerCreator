import React from 'react'

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper 
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two <NavigationItem/> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('should render three <NavigationItem/> elements if authenticated', () => {
        wrapper.setProps({ isAuthehticated : true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should render <NavigationItem/> element with link to /logout if authenticated', () => {
        wrapper.setProps({ isAuthehticated: true })
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})

// Enzyme helps us to not render the entire react app just to test one component
// We should use adapter to connect it to react app.
// Shallow render the component with all content but not deep. So that navitem placeholder will be rendered
// Each test runs independently, and there are a lot of method to test whatever you want

// Ask yourself what can be crucial in my app, what can break it and write test to it.