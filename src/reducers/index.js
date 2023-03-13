import authReducers from "./authReducers";
import  { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducers,
    
});

export default rootReducer;