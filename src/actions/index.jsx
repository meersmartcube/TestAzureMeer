import { 
    SIGN_IN
    ,SIGN_OUT   
} from './types';

export const signIn = (businessData) => {   
   return {
       type : SIGN_IN,
       payload : businessData,
   };
};

export const signOut = () => {
   return {
       type : SIGN_OUT,
   };
};