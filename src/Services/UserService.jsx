import {
    AUTHENTICATEWEBUSER,
    CHANGEPASSWORD,
    FORGETPASSWORD,
} from './AppService'

import axiosbaseconfig from './BaseServices/axiosbaseconfig'

export const UserService = {
    getAuthenticateWebUser,
    changePassword,
    forgetPassword,
};

async function getAuthenticateWebUser (username, password ,deviceKey) {

    const data = JSON.stringify({
        UserName: username,
        Password: password,
        DeviceKey: deviceKey,
      });

   return await axiosbaseconfig.post(AUTHENTICATEWEBUSER, data)
       .then((response) => {
        return response.data;
    }).catch(response => {             
        return response.data; 
    }); 
 }

async function changePassword (userId, currentPassword, newPassword) {    
    
    let data = JSON.stringify({
      UserId: userId,
      CurrentPassword: currentPassword,
      NewPassword: newPassword,
    });
  
   return await axiosbaseconfig.post(CHANGEPASSWORD, data)
    .then(response => { 
        return response.data; 
    }).catch(response => {               
        return response.data;  
    });   
}

 async function forgetPassword (username) {
    
   return await axiosbaseconfig.post(`${FORGETPASSWORD}/${username}`)
    .then(response => {
        return response.data; 
    }).catch(response => {
        return response.response.data;    
    }); 
}

