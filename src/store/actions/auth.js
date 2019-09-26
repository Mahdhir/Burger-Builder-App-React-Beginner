import * as actionTypes from "./actionTypes";
import axios from 'axios';
import * as keys from '../../keys';
const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email: email
    }
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

const checkAuthTimeout = (expiry) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiry * 1000);
    }
}

export const auth = (email, password, type) => {
    return dispatch => {
        dispatch(authStart());
        let url = null;
        if (type === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+keys.googleApiKey;
        }

        if (type === 'signin') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+keys.googleApiKey;
        }

        console.log(type);

        console.log(url);

        const obj = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        console.log(obj);
        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(url, obj, { headers })
            .then(res => {
                console.log(res);
                const idToken = res.data.idToken;
                const userId = res.data.localId;
                const email = res.data.email;
                const expiry = res.data.expiresIn;
                const obj = {
                    ...res.data,
                    loginTime:new Date().getTime()
                }
                localStorage.setItem('userData', JSON.stringify(obj));
                dispatch(authSuccess(idToken, userId, email));
                dispatch(checkAuthTimeout(expiry));
            })
            .catch(err => {
                let error = err.response.data.error.message;
                console.log(error);
                dispatch(authFail(error));
            });

    }
}

export const localStorageRetrieve = (res) => {
    return dispatch => {
        const idToken = res.idToken;
        const userId = res.localId;
        const email = res.email;
        const currentTime = new Date().getTime();
        const loginTime = res.loginTime;
        const diff = currentTime/1000 - loginTime/1000;
        const expiry = res.expiresIn;
        if(diff > expiry){
            dispatch(logout());
        }else{
            dispatch(authSuccess(idToken, userId, email));
            dispatch(checkAuthTimeout(expiry-diff));
        }
    }
}

