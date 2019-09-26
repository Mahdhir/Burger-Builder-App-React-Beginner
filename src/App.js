import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout';
import { Switch, Route, Redirect } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import ReactNotifications from 'react-notifications-component';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncBurgerBuilder = asyncComponent(() => {
  return import('./containers/BurgerBuilder/BurgerBuilder');
});


class App extends Component {

  componentDidMount(){
    console.log('LOADED APP');
    let data = localStorage.getItem('userData');
    if(data){
      data = JSON.parse(data);
      this.props.onRetrieve(data);
    }

  }

  // componentDidUpdate(){
  //   if(this.props.email === null || this.props.email === undefined){
  //     this.props.history.replace('/');
  //   }
  // }

  render() {
    let value = null;
    if(this.props.email === null || this.props.email === undefined){
      value = <Redirect to='/'/>
    }
    return (
      <div>
        {value}
        <Layout>
          <ReactNotifications isMobile={true} />
          <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/burger" component={asyncBurgerBuilder} />
            <Route path="/" component={asyncAuth}/>
          </Switch>
        </Layout>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
      onRetrieve: (result) => {  dispatch(actions.localStorageRetrieve(result))}
  }
}

const mapStateToProps = (state) => {
  return {
      email: state.auth.userEmail
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);
