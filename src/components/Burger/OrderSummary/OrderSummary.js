import React from 'react';
import Aux from '../../../hoc/Aux-Hoc/Aux-Hoc';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((key) => {
            return (
                <li key={key}>
                    <span style={{ textTransform: 'capitalize' }}>{key}</span>:{props.ingredients[key]}
                </li>
            );
        })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Delicious Burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)} &#36;</strong></p>
            <p>Continue to Checkout ?</p>
            <Button btnType="Danger" clicked={props.clicked}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Checkout</Button>
        </Aux>
    );
};

export default OrderSummary;