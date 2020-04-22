import React from 'react';

import classes from './Input.module.css'

const Input = props => {
    let inputElement = null
    const inputClasses = [classes.InputElement]
    let validationError = null

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
        validationError = <p style={{margin: '5px 0', color: 'red'}}> Please enter a valid value!</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
             className={inputClasses.join(' ')} 
             {...props.elementConfig} 
             value={props.value} 
             onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
            <select
                className={classes.InputElement}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                    key={option.value} 
                    value={option.value}>{option.displayValue}</option>
                ))}
            </select>
            ) 
            break;
        default:
            inputElement = <input className={inputClasses} {...props.elementConfig} value={props.value} />
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
};

export default Input;

// This component is custom input elemet which based on prop passed to it
// creates appropriate html element. Also, all the props from parent are passed 
// here and populate those elements. So that we can pass name or etc to this element
// and it also passed to default input element.