import React from 'react';
import './Order.css';

const Order = (props) => {

    const ingredients = []
    for(let key in props.ingredients){
        const obj = {
            name:key,
            amount:props.ingredients[key]
        };
        ingredients.push(obj);
    }

    const output = ingredients.map(
        ig => {
            return <span key={ig.name} style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border:'1px solid #ccc',
                padding:'5px'
            }}>{ig.name} - ({ig.amount})</span>
        }
    )
    
    return (
        <div className="Order">
            <p>Ingredients {output}</p>
            <p>Price <strong>USD {props.price}</strong></p>
        </div>
    );
};


export default Order;