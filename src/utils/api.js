import axios from "axios";
const instance=axios.create({
    // baseURL:'https://localhost:7112/api'  // host signalR
    // baseURL:'https://localhost:4000/api'  // host signalR iis
    // baseURL:'http://localhost:2000/api'  // host http
    baseURL:'https://iotapi20240507134111.azurewebsites.net/api'  // host azure

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