export const updateObject = (oldObject, newProps) => {
    return {
        ...oldObject,
        ...newProps
    }
}
export const checkValidity = (value, rules) => { // UPD 1
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
// Validation is implemented manually but ofc can be used from 3rd party libraries like Validaiton.js or react-validation etc