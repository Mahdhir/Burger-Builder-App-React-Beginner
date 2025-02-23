import * as actionTypes from '../actions/actionTypes';
// import Notifier from '../../helpers/NotificationService/Notifier';


const initialState = {
    ingredients:null,
    totalPrice:4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1
                },
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1
                },
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]

            };
        case actionTypes.SET_INGREDIENT:
            
            return {
                ...state,
                ingredients:action.ingredients,
                totalPrice:initialState.totalPrice
            };
        case actionTypes.FETCH_INGREDIENT_FAILED:
                // Notifier.addNotification('Error', 'Could not fetch ingredients', 'danger');
                return {
                    ...state,
                    ingredients:''
                };
        default:
            return state;
    }
};

export default reducer;