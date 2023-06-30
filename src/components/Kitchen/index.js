import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";

import Kots from "./kots/index";

import messaging from "../../init-fcm";
import { saveNotificationToken } from "../../services/notification/actions";

class Kitchen extends Component {
    async componentDidMount() {
        const { kitchen_user } = this.props;
    }

    render() {
        const { kitchen_user } = this.props;

        if (!kitchen_user.success) {
            return <Redirect to={"/kitchen/login"} />;
        }else{
            return (
                <React.Fragment>

                    <Kots />

                </React.Fragment>
            )
        }
    }

}

const mapStateToProps = (state) => ({
	kitchen_user: state.kitchen_user.kitchen_user,
});

export default connect(
	mapStateToProps,
	{ saveNotificationToken }
) (Kitchen);