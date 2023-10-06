import { 
  SPINNER_SHOW
  ,SPINNER_HIDE 
} from './types';

export const showSpinner = () => {    
    return dispatch => {
      dispatch({ type: SPINNER_SHOW,  });
    };
  };
  
export const hideSpinner = () => {
  return dispatch => {
    dispatch({ type: SPINNER_HIDE, });
  };
};