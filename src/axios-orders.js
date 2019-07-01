import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-75fdd.firebaseio.com'
})

export default instance;