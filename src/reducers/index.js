import { combineReducers } from 'redux'
import authReducer from './authReducer'
import uiReducer from './uiReducer'
import spinnerReducer from './spinnerReducer'

export default combineReducers({
    auth : authReducer,  
    ui: uiReducer,  
    spinner: spinnerReducer
});