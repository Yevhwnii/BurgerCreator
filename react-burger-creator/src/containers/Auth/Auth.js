import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }
    checkValidity(value, rules)  { // UPD 1
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.isEmail) {
            const testString = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            isValid = testString.test(value)
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler(event, controlName)  {
            const updatedControls = {
                ...this.state.controls,
                [controlName]: {
                    ...this.state.controls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true
                }
            }
            this.setState({ controls: updatedControls })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp}
        })
        
    }
    render() {

        const formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formEl => {
            return (
                <Input
                    key={formEl.id}
                    elementType={formEl.config.elementType}
                    elementConfig={formEl.config.elementConfig}
                    value={formEl.config.value}
                    invalid={!formEl.config.valid}
                    shouldValidate={formEl.config.validation}
                    touched={formEl.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formEl.id)}
                />
            )
            
        })
        if (this.props.loading) {
            form = <Spinner/>
        }
        let errorMsg = null
        if(this.props.error) {
            errorMsg = (
                <p>
                    {this.props.error.message}
                </p>
            )
        }
        let authRedirect = null
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger"
                >SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.buidling,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

// So here we hardcoded redirection from checkout to auth and then back.
// if we woould need to dynamically redirect user we could do it either 
// in way of storing this url in redux store and then replacing it in "to" prop
// or we could pass this url thru query params.