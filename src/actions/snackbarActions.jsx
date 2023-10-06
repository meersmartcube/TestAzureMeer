import { 
  SNACKBAR_SUCCESS
  ,SNACKBAR_ERROR   
  ,SNACKBAR_INFO   
  ,SNACKBAR_CLEAR   
} from './types';

export const showSuccessSnackbar = (message) => {    
      return dispatch => {
        dispatch({ type: SNACKBAR_SUCCESS, message, });
      };
};
    
export const showErrorSnackbar = (message) => {    
  return dispatch => {
    dispatch({ type: SNACKBAR_ERROR, message, });
    };
 };

export const showInfoSnackbar = (message) => {    
  return dispatch => {
    dispatch({ type: SNACKBAR_INFO, message, });
  };
};

export const clearSnackbar = () => {
  return dispatch => {
    dispatch({ type: SNACKBAR_CLEAR, });
  };
};