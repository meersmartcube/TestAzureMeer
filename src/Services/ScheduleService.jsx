import {
    GETBUSINESSESSCHEDULES
} from './AppService'

import axiosbaseconfig from '../Services/BaseServices/axiosbaseconfig'

export const ScheduleService = {
    getBusinessesSchedules
};

async function getBusinessesSchedules(BusinessId, start, end) {

    const data = JSON.stringify({
        BusinessId:BusinessId,
        Start:start,
        End:end
    
    });

   return await axiosbaseconfig.post(GETBUSINESSESSCHEDULES,
      data)
       .then((response) => {
        return response.data;
     }); 
 }