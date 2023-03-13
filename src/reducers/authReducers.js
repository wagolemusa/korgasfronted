import { authConstants } from "../context/Actions";

const initState = {
    token: null,
    user: {
        firstname: '',
        lastname: '',
        email: '',
        
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
};

const AuthReducers = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.LOGIN_SECCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SECCESS:
            state = {
                ...initState
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        default:
            state = {
                ...initState
            }
    }
    return state;
}

export default AuthReducers;