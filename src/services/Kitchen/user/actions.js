import {
    LOGIN_KITCHEN_USER,
	LOGOUT_KITCHEN_USER,
	UPDATE_KITCHEN_USER_INFO,
} from "./actionTypes";

import {
    LOGIN_KITCHEN_USER_URL,
	TOGGLE_KITCHEN_STATUS_URL
} from "../../../configs";

import Axios from "axios";

export const loginKitchenUser = (email, password) => (dispatch) => {
	Axios.post(LOGIN_KITCHEN_USER_URL, {
		email: email,
		password: password,
	})
		.then((response) => {
			const kitchen_user = response.data;
			return dispatch({ type: LOGIN_KITCHEN_USER, payload: kitchen_user });
		})
		.catch(function(error) {
			console.log(error);
		});
};

export const logoutKitchenUser = () => (dispatch) => {
	const kitchen_user = [];
	dispatch({
		type: LOGOUT_KITCHEN_USER,
		payload: kitchen_user,
	});
};

export const toggleKitchenStatus = (token, toggle_status = false) => (dispatch) => {
	return Axios.post(TOGGLE_KITCHEN_STATUS_URL, {
		token: token,
		toggle_status: toggle_status,
	})
		.then((response) => {
			const data = { kitchen_user: response.data };
			return dispatch({ type: UPDATE_KITCHEN_USER_INFO, payload: data });
		})
		.catch(function(error) {
			console.log(error);
		});
};