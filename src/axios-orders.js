import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-app-mahdhi.firebaseio.com/'
});

export default instance;