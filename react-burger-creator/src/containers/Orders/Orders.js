import React, {Component} from 'react';
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then( res =>{
                const fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push(
                        {...res.data[key],
                        id: key}) // since res.data is an object, it tranforms it into array
                }
                this.setState({ loading:false, orders: fetchedOrders  })
            })
            .catch(e=>{
                this.setState({ loading: false })
            })
    }


    render() {
        return (
            <div>
                {this.state.orders.map( order => (
                     <Order key={order.id}
                            ingredients={order.ingredients}
                            price= {order.price}
                             />
                ))}
            </div>
            
        )
    }
};

export default withErrorHandler(Orders, axios);

// Displays when Orders clicked, fetches all the orders together