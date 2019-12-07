import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxaliary'


const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component  {

        state = {
            error: null
        }

        componentDidMount () {
            axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error:error})
            })
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
*/