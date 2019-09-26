import React,{Component} from 'react';
import PropTypes from 'prop-types';

import './BurgerIngredient.css'
class BurgerIngredient extends Component {

    render(){
        let ingredients = null;

            switch (this.props.type) {
                case ('bread-bottom'):
                    ingredients = <div className="Ingredient-BreadBottom"></div>;
                    break;
                case ('bread-top'):
                    ingredients = (
                        <div className="Ingredient-BreadTop">
                            <div className="Ingredient-Seeds1"></div>
                            <div className="Ingredient-Seeds2"></div>
    
                        </div>
                    );
                    break;
                case ('meat'):
                    ingredients = <div className="Ingredient-Meat"></div>;
                    break;
                case ('salad'):
                    ingredients = <div className="Ingredient-Salad"></div>;
                    break;
                case ('cheese'):
                    ingredients = <div className="Ingredient-Cheese"></div>;
                    break;
                case ('bacon'):
                    ingredients = <div className="Ingredient-Bacon"></div>;
                    break;
                default:
                    ingredients = null;
            }
    
        return ingredients;
    }

   
};

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}


export default BurgerIngredient;