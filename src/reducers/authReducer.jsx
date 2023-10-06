import {  
    SIGN_IN,
    SIGN_OUT 
}
from '../actions/types';
import SecureLS from 'secure-ls';

//capital variable means don't change object in any circumstances
 var ls = new SecureLS({encodingType: 'aes'});
let _businessData = localStorage.getItem('_secure__metadata__info_') ? ls.get('_secure__metadata__info_') : null;
const INTIAL_STATE = _businessData ? { isSignedIn: true, businessData: _businessData } : { isSignedIn: null, businessData :null };

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case SIGN_IN:
            ls.set('_secure__metadata__info_', action.payload);
            return {...state, isSignedIn :true, businessData :action.payload};
        case SIGN_OUT:        
            ls.clear();
            return {...state, isSignedIn :false, businessData :null};
        default :
           return state;
        }
};