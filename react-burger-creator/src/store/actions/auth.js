import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVNMqBfIY0-04MDioq1qk0Nv6GC_2bW48'
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVNMqBfIY0-04MDioq1qk0Nv6GC_2bW48'
        }
        
        axios.post(url, authData)
                .then(res => {
                    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
                    localStorage.setItem('token', res.data.idToken)
                    localStorage.setItem('expirationDate', expirationDate )
                    localStorage.setItem('userId', res.data.localId)
                    dispatch(authSuccess(res.data.idToken, res.data.localId))
                    dispatch(checkAuthTimeout(res.data.expiresIn))
                })
                .catch(err => {
                    console.log(err.response);
                    dispatch(authFail(err.response.data.error))
                    
                })
    
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(authLogout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)) // expiry date in secs
            } else {
                dispatch(authLogout())
            }
         
        }
    }
}
// This function check auth of the user based on what is in his local storage. So firsly checked if he has a token,
// then if expiration date is not succeeds current time and only then log in again otherwise logout.


// So we setup auth on firebase. We send here a post requst as written in docs with email and password,
// we get back token and refreshToken which is used locally to refresh data

// Since token will last only for one hour we need somehow refresh it

// Security issues::
// idToken which we get from firebase has only 1 hour of validation that is just another
// layer of security to protect from cross-site attacks. Because if you have token you log in easily.
// localStorage is protected by React by default so it is secured. Still we can use refreshTokens to get new 
// token from firebase using request on Exchange Refresh Token for Id Token in firebase docs.
// And thus our user will never get logout, but it should be protected is some ways and additional checks should also be added.