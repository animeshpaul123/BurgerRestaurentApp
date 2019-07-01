import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinners/Spinner';

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    }
    componentDidMount () {
        axios.get("/orders.json")
            .then(res => {
                console.log(res.data)
                const data = []
                for (let key in res.data) {
                    data.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({orders: data, loading: false})
                console.log("your data",data)
                console.log("your data",this.state.orders)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render () {
        let orders = this.state.orders.length > 0 ? 
                        this.state.orders.map(order => {
                            return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                        }) : 
                            <div style={{textAlign: 'center'}}>You have no previous orders</div>
        if (this.state.loading) {
            orders = <Spinner />
        }
        console.log(orders)
        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default Orders;