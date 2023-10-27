import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://129.148.42.252:5033'
});

/* export const api = axios.create({
    baseURL: 'http://localhost:5033'
}); */