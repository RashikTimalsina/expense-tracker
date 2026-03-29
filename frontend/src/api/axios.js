import axios from 'axios';

//create one axios instance for all api calls
const api=axios.create({
    baseURL: 'http://localhost:8000',
})


//before requests, add token to header if exist
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('token');
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
})

export default api;