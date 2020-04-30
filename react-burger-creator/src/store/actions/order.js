import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {
            orderId: id,
            orderData: orderData
        }
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchedOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,

    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        dispatch(fetchedOrdersStart())
        axios.get('/orders.json' + queryParams )
            .then(res => {
                const fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push(
                        {
                            ...res.data[key],
                            id: key
                        }) // since res.data is an object, it tranforms it into array
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(e => {
                dispatch(fetchOrdersFail(e))
            })
    }
}

// We adjusted our order to be able to react on auth state of our application.
// So orders are not accesible if there is no token in redux store, the same goes with purchasing burger

// So here with these firebase specific url we can access only data related to user, since we are receiving his userId from 
// redux store and pass it