import * as actionTypes from './actionTypes';
import instance from "../../axios-orders";


export const addIngredient = (name) => {

    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };

};

export const removeIngredient = (name) => {
    return { 
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: name
    };
};

const setIngredient = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients 
    }
}

const fetchIngredientsFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        instance.get('ingredients.json').then(
            res => {
                dispatch(setIngredient(res.data));
            }
        ).catch(
            err => {
                dispatch(fetchIngredientsFailed());
            }
        )
    }
}