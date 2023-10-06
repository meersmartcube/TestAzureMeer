import {  
  SPINNER_SHOW
  ,SPINNER_HIDE 
}
from '../actions/types';

const spinnerReducer = (state = {}, action) => {
  
    switch (action.type) {
      case SPINNER_SHOW:      
        return {
          ...state,
          showSpinner: true,         
        };
      case SPINNER_HIDE:      
        return {
          ...state,
          showSpinner: false,
        };
      default:
      
        return state;
    }
  }; 
  
  export default spinnerReducer;