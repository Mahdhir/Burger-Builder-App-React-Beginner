import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';
import { connect } from 'react-redux';
import * as authActions from '../../../../store/actions/index';



const NavigationItems = (props) => {

   

    return (
        <ul className="NavigationItems">
            <li className="Email">{props.email}</li>
            <NavigationItem link="/burger">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            <NavigationItem link="/" clicked={props.onLogout}>Logout</NavigationItem>
        </ul>
    );
};


const mapStateToProps = (state) => {
    return {
        email: state.auth.userEmail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(authActions.logout()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavigationItems);