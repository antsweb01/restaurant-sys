import { GET_KOTS } from "./actionTypes";
import { GET_KOTS_URL } from "../../../configs";
import Axios from "axios";

export const getKots = (token, status = "") => (dispatch) => {
	Axios.post(GET_KOTS_URL, {
        token: token,
        status: status,
    })
        .then(responce => {
            const kots = responce.data;
            return dispatch({ type: GET_KOTS, payload: kots });
        })
        .catch(function(error) {
            console.log(error);
        })
};