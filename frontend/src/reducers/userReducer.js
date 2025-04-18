import { LOGIN, LOGOUT } from "../actions/types";

const defaultState = {
    isAuthenticated: false,
    user: null
}

const userReducer = (state=defaultState, action) => {
    switch (action.type) {
        case LOGIN:
            return {isAuthenticated: true, user: {...action.payload}}
        case LOGOUT:
            return defaultState
        default:
            return state
    }
}

export default userReducer