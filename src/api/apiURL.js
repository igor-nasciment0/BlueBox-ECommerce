import axios from 'axios';

const api = axios.create({
    baseURL: 'http://129.148.42.252:5037'
})   

// const api = axios.create({
//     baseURL: 'http://localhost:5037'
// }) 

export default api;