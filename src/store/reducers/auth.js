import * as actionTypes from '../actions/actionTypes';
import Notifier from '../../helpers/NotificationService/Notifier';

const initialState = {
    idToken: null,
    userId: null,
    userEmail:null,
    error: null,
    loading: false
};

const reducer = (state=initialState, action) => {

    switch (action.type) {
        case (actionTypes.AUTH_START):
            return {
                ...state,
                loading: true
            };

        case (actionTypes.AUTH_SUCCESS):
            return {
                ...state,
                idToken: action.idToken,
                userId: action.userId,
                userEmail:action.email,
                error: null,
                loading: false
            }
        case (actionTypes.AUTH_FAIL):
            let error = 'Invalid Credentials';
            if(action.error !== 'INVALID_PASSWORD'){
                error = action.error;
            }
            Notifier.addNotification('Authorization Failed', error, 'danger');
            return {
                ...state,
                error: action.error,
                loading: false
            };

        case(actionTypes.AUTH_LOGOUT):
            return{
                ...state,
                idToken: null,
                userId: null,
                userEmail:null
            };

        default:
            return {
                ...state
            }
    }
};

export default reducer;