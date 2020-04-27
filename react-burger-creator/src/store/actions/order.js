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

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
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

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchedOrdersStart())
        axios.get('/orders.json')
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