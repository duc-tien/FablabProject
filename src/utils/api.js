import axios from "axios";
const instance=axios.create({
    baseURL:'https://localhost:7112/api'

})
instance.interceptors.request.use(function (config) {
  const token=localStorage.getItem('token')
  if(token){
    config.headers['Authorization']='Bearer '+ token
  }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


export default instance