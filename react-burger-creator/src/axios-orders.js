import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://react-my-burger-676bc.firebaseio.com/'
});


export default instance;

/*
We don`t use global axios because later on we want to add authentication, and therefore
base url will be changed.

*/