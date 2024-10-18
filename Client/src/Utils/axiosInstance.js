import axios from 'axios';
const BASEURL='https://notesapp-backe.onrender.com'

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
