import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {BurgerBuilder} from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({adapter: new Adapter()})

describe('<BurgerBuider />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />)
    })

    it('should render <BuildControls /> when receining ingredients', () => {
        wrapper.setProps({ings: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})

// we exported it in normal way so we don`t connect it to the store and router
// it exptects onInitIngredients prop from redux so we set it to empty arrow func