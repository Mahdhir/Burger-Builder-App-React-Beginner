import React, { Component } from 'react';
import Aux from '../../hoc/Aux-Hoc/Aux-Hoc';
import './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';
import { withRouter } from 'react-router-dom';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    slideDrawerOpenHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }


    render() {
        let value = (
            <Aux>
                <Toolbar clicked={this.slideDrawerOpenHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className="layout-content">
                    {this.props.children}
                </main>
            </Aux>
        );

        const param = this.props.history.location.pathname;
        if (!param.includes('burger') && !param.includes('orders') && !param.includes('checkout')) {
            value = (
            <main className="layout-auth">
                {this.props.children}
            </main>
            )
        }
        return (
            value
        );
    }
}

export default withRouter(Layout);