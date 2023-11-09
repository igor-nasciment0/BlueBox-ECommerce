import axios from 'axios';

const api = axios.create({
    baseURL: 'http://129.148.42.252:5033'
})   

// const api = axios.create({
//     baseURL: 'http://localhost:5033'
// }) 

export default api;