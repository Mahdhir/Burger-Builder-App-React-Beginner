import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import instance from "../../axios-orders";
import Notifier from '../../helpers/NotificationService/Notifier';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders:[],
        loading:true
    }

    componentDidMount(){
            const token = this.props.token;
            const userId = this.props.userId;
            const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
            instance.get('/orders.json'+queryParams).then(
                res => {
                    console.log(res.data);
                    const fetchedOrders = [];
                    for(let i in res.data){
                        fetchedOrders.push({...res.data[i],id:i});
                    }
                    this.setState({
                        loading:false,
                        orders:fetchedOrders
                    });
                }
            ).catch(
                err => {
                    this.setState({
                        loading:false
                    });
                    Notifier.addNotification('Failure', 'Fetch Failed', 'danger');
                }
            );
        
        
    }

    render() {
        let content = (<Spinner/>);
        if(!this.state.loading){
            content = this.state.orders.map( order => {
                return <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
            })
        }
        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        token:state.auth.idToken,
        userId:state.auth.userId
    }
}

export default connect(mapStateToProps)(Orders);