import React from 'react';
import BuildControl from "./BuildControl/BuildControl";
import './BuildControls.css';

const BuildControls = (props) => {

    console.log(props.ingredients);
    let camalize = (str) => {
        return str.replace(/\W+(.)/g, function(match, chr)
         {
              return chr.toUpperCase();
          });
      }

    const items = Object.keys(props.ingredients);
    const controls = [];
    items.forEach((value) =>{
        let camelCase = camalize(value);
        controls.push({
            label:camelCase.charAt(0).toUpperCase() + camelCase.slice(1),
            type:value
        });
    })
    
    // const controls = [
    //     {label:'Salad',type:'salad'},
    //     {label:'Meat',type:'meat'},
    //     {label:'Bacon',type:'bacon'},
    //     {label:'Cheese',type:'cheese'}
    // ];
    let transformedControlsTags = [];
    controls.map( item =>  transformedControlsTags
        .push(<BuildControl 
            key={item.label} 
            label={item.label} 
            addItem={() => props.ingredientAdded(item.type)} 
            removeItem={()=>props.ingredientRemoved(item.type)}
            disabled={props.disabledInfo[item.type]}
            />));
    return (
        <div className="BuildControls">
            <p>Current Price: <strong>{props.currentPrice.toFixed(2)} &#36;</strong></p>
            {transformedControlsTags}
            <button 
            className="OrderButton" 
            disabled={!props.purchaseable}
            onClick={props.orderClicked}
            >ORDER NOW</button>
        </div>
    );
};

export default BuildControls;