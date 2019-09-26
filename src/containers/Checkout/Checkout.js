import React, { Component } from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Route,Redirect } from 'react-router-dom';
// import ContactData from './Contact-Data/ContactData';
import Aux from '../../hoc/Aux-Hoc/Aux-Hoc';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const asyncContactForm = asyncComponent(() => {
    return import('./Contact-Data/ContactDataFormik');
  });

class Checkout extends Component {
   
    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact');
    }

    render() {

        let value = (<Spinner />);
        if (this.props.ings) {
            value = (
                <Aux>
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        cancelled={this.checkoutCancelHandler}
                        continued={this.checkoutContinuedHandler} />
                    <Route path={this.props.match.path + '/contact'}  component={asyncContactForm}/>
                </Aux>
            );
        }else{
            value = <Redirect to="/burger" />
        }
        return (
            <div>
                {value}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients
    }
}



export default connect(mapStateToProps)(Checkout);