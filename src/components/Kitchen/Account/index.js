import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";

import { toggleKitchenStatus } from "../../../services/Kitchen/user/action";

import Ink from "react-ink";

class Account extends Component {

    componentDidMount() {
        const { kitchen_user } = this.props;
    }

    __changeStatusAndLogoutKitchen = () => {
		const { kitchen_user } = this.props;

		if (kitchen_user.success) {
			if (navigator.userAgent === "FoodomaaAndroidWebViewUA") {
				if (window.Android !== "undefined") {
					window.Android.logoutKitchen();
				}
			}
		}

		this.props.toggleKitchenStatus(kitchen_user.data.auth_token, false).then(() => {
			this.props.logoutKitchenUser();
		});
	};

    render() {
        const { kitchen_user } = this.props;
        return (
            <React.Fragment>
                <div className="tab_theme_2 vh-100 dark-bg">
                    <div className="light-bg">
                        <div className="container d-flex justify-content-between">
                            <div class="delivery-tab-title px-20 py-15">{ kitchen_user.data.name }</div>
                            <div className="delivery-order-refresh">
                                <button
                                    className="btn btn-refreshOrders mr-15"
                                    onClick={() => this.__changeStatusAndLogoutKitchen()}
                                    style={{ position: "relative" }}
                                >
                                    Logout <i class="si si-logout"></i>
                                    <Ink duration={1200} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => ({
	kitchen_user: state.kitchen_user.kitchen_user,
});

export default connect(
    mapStateToProps,
    { toggleKitchenStatus }
) (Account);