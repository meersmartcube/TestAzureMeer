import {  
  SNACKBAR_SUCCESS
  ,SNACKBAR_ERROR 
  ,SNACKBAR_INFO 
  ,SNACKBAR_CLEAR 
}
from '../actions/types';

const uiReducer = (state = {}, action) => {
  
    switch (action.type) {
      case SNACKBAR_SUCCESS:      
        return {
          ...state,
          snackbarBackgroundcolor: '#4caf50',
          successSnackbarOpen: true,
          successSnackbarMessage: action.message
        };
      case SNACKBAR_ERROR:      
        return {
          ...state,
          snackbarBackgroundcolor: '#f44336',
          successSnackbarOpen: true,
          successSnackbarMessage: action.message
        };
      case SNACKBAR_INFO:      
        return {
          ...state,
          snackbarBackgroundcolor: '#ff9800',
          successSnackbarOpen: true,
          successSnackbarMessage: action.message
        };
      case SNACKBAR_CLEAR:      
        return {
          ...state,
          successSnackbarOpen: false,
          errorSnackbarOpen: false,
          infoSnackbarOpen: false
        };
      default:
      
        return state;
    }
  }; 
  
  export default uiReducer;