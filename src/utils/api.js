import axios from "axios";
const instance=axios.create({
    // baseURL:'http://localhost:2000/api'
    baseURL:'https://jsonplaceholder.typicode.com'

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