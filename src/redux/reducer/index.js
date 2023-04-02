import loginSignup from "./loginSignup";
import notes from "./notes";    

import { combineReducers } from "redux"; 

const rootReducer = combineReducers({
    loginSignup,
    notes,
});

export default rootReducer;