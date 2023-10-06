import {
    GETBUSINESSDETAIL,
    GETBUSINESSESBYRADIUS,
    // CECKINCHECKOUT,
    // GETCHECKINCHECKOUT,
} from './AppService'

import axiosbaseconfig from '../Services/BaseServices/axiosbaseconfig'

export const Business = {
    getBylatlongcatId,
    getBusinessById
};

async function getBylatlongcatId (latitude, longitude, radius, catId){   
    
    // const businessCategoryId =[];
    // businessCategoryId.concat(catId)
    const data = JSON.stringify({
        Latitude: latitude,
        Longitude: longitude,
        Radius: radius,
        BusinessCategoryId : catId
    });

   return await axiosbaseconfig.post(GETBUSINESSESBYRADIUS,
      data)
       .then((response) => {
        return response.data;
     }); 
 }

 async function  getBusinessById (businessId) {    
    const data = JSON.stringify({
        id: businessId
    });

   return await axiosbaseconfig.post(GETBUSINESSDETAIL,
      data)
       .then((response) => {
        return response.data;
     }); 
 }