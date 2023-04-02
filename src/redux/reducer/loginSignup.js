
const initialState = [];

const loginSignup = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
        return state=action.payload;
        case "SIGNUP":
        return state=action.payload;
        case "TOKEN":
        return state=action.payload;
        default:
        return state;
    }
};

export default loginSignup;