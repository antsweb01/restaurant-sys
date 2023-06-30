import { GET_KOTS } from "./actionTypes";

const initialState = {
    kots: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_KOTS:
            return { ...state, kots: action.payload };
        default:
            return state;
    }
}