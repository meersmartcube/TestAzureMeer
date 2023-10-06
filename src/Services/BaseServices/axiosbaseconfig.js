import axios from 'axios';
 import {BASEURL} from '../AppService'
 import {authHeader} from '../auth-header';
const axiosbase = axios.create({
  // Base UI Path should Come Here  
  baseURL: BASEURL,
  timeout: 5000,
  // headers: {
	//   'Access-Control-Allow-Origin': '*' ,
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Content-Type': 'application/json',
  //   'Accept' : 'application/json',
	// },   
    transformRequest: [(data, headers) => {
        // transform the data
        console.log(headers);
        console.log('Tranform Data');
        //console.log(window.Configs);
        return data;
      }]
});

//default headers
var token = authHeader();
if(token){
  axiosbase.defaults.headers["Authorization"] = 'Bearer ' + token;
}
axiosbase.defaults.headers["Accept"] = 'application/json';
axiosbase.defaults.headers["Content-Type"] = 'application/json';

// Add a request interceptor
axiosbase.interceptors.request.use((config) => {
    // Do something before request is sent
    //debugger
    //config.headers["Authorization"] = "bearer " + window.localStorage.getItem("authenticationToken");
    console.log('Request was sent');
    return config;
  }, (error) => {
    // Do something with request error
    console.log('Error occured while request');
    return Promise.reject(error);
  });
 
// Add a response interceptor
axiosbase.interceptors.response.use((response) => {
    // Do something with response data
    console.log('Response was received');
    return response;
  }, (error) => {
    // Do something with response error
    console.log('Error occured while response');
    return Promise.reject(error);
  });
 
  export default axiosbase;