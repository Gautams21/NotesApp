import axios from 'axios';
const BASEURL='http://localhost:4000'

const axiosInstance=axios.create({
    baseURL:BASEURL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken=localStorage.getItem('Token');
        if(accessToken){
            config.headers.Authorization=`Bearer ${accessToken}`
        }
        return config;
    },
        (error)=>{
            return Promise.reject(error)
        }
    
)

export default axiosInstance;