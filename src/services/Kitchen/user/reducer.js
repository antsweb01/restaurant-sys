import { 
    LOGIN_KITCHEN_USER, 
    LOGOUT_KITCHEN_USER, 
    UPDATE_KITCHEN_USER_INFO 
} from "./actionTypes";

const initialState = {
    kitchen_user: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_KITCHEN_USER:
            return { ...state, kitchen_user: action.payload };
        case LOGOUT_KITCHEN_USER:
            return { ...state, kitchen_user: action.payload };
        case UPDATE_KITCHEN_USER_INFO:
            return { ...state, kitchen_user: action.payload.kitchen_user };
        default:
            return state;
    }
}