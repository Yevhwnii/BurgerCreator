import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxaliary'


const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component  {

        state = {
            error: null
        }
        
        
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error:error})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }

        render() {
            return (
                <Aux>
                    <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message: null}
                </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default withErrorHandler;

/*
This component is HOC which wrap any component and handles errors which migth occur in it.
Currently it is handling HTTP POST request on server only. So basically, it is a function
which takes in Wrapped Component and axios and returns an anonymous class. This class is a 
component which is responsive for displaying an error if it is occurs. It use Modal from UI 
with error message as a props.children instead. It shows only if error is not null. In its turn
interceptors, which are methods that executes on every request sent and response received, manipulate
the state which contains this error message.

It is great approach for POST requsts. But as we know, due to fact how lifecycle methods work,
componentDidMount in this component is rendered after all componentsDidMount in all its childs loads
That mean, if we send a GET request in our BurgerBuilder container, and its url is wrong we will never get
an error message back, because this componentDidMount is executed the last.

To handle this, instead of componentDidMount we can use either componentWillMount or constructor.
Which both can greatly do the same because we just need to set interceptors when our component gets created.

Those interceptors gets set on each time the component is created, but it it can so that our component may be 
created several times and those interceptors won`t be deleted but new one will be created and therefore memory will leak.
Thats why we implement componentWillUnmount method and remove interceptors there each time component is not using anymore.
*/