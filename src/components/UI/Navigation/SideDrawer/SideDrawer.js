import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../Backdrop/Backdrop';
import Aux from '../../../../hoc/Aux-Hoc/Aux-Hoc';

const SideDrawer = (props) => {

    const dynamicClassName = props.open ? 'SideDrawer Open' : 'SideDrawer Close';

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={dynamicClassName}>
                <div style={{ height: '11%' }}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;