import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";

import { getKots } from "../../../services/Kitchen/kots/actions"
import Account from "../Account";
import NewKots from "../NewKots";
import AcceptedKots from "../AcceptedKots";
import CompletedOrders from "../CompletedOrders";

import { logoutKitchenUser } from "../../../services/Kitchen/user/actions";

import Ink from "react-ink";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Kots extends Component {

    state = {
		play: false,
		tabIndex: 0,
	};
    
    componentDidMount() {
		if (this.props.kitchen_user.success) {
			this.props.getKots(this.props.kitchen_user.data.auth_token, "");
		}

		this.refreshSetInterval = setInterval(() => {
			this.__refreshOrders();
		}, 15 * 1000);
	}

	__refreshOrders = (status = "") => {
		const { kitchen_user } = this.props;
		if (kitchen_user.success && kitchen_user.data.status) {
			console.log("refresh orders called");
			this.props.getKots(this.props.kitchen_user.data.auth_token, status);
		}
	};

    componentWillReceiveProps(newProps) {
        const { kots } = this.props;
    }

    componentWillUnmount() {
		clearInterval(this.refreshSetInterval);
	}

    onTabSelect = (tabIndex) => {
		localStorage.setItem("kitchenTabIndex", tabIndex);
		this.setState({ tabIndex: tabIndex });
	};

    render() {

        const { new_kots, accept_kots, complete_kots } = this.props.kots;
        console.log(this.props);

        return (
            <React.Fragment>
                <Tabs 
                    selectedIndex={
                        localStorage.getItem("kitchenTabIndex") === null
                        ? this.state.tabIndex
                        : parseInt(localStorage.getItem("kitchenTabIndex"))
                    }
                    onSelect={(tabIndex) => this.onTabSelect(tabIndex)}
                >
                    <div className="tab_theme_2 dark-bg content font-size-xs clearfix footer-fixed"
                        style={{ display: "block", width: "100%", padding: "0", height: "4.6rem" }}
                    >
                    <TabList>
                        <Tab>
                            <div className="text-center">
                                <span
                                    className="cart-quantity-badge"
                                    style={{ backgroundColor: "#f44336", top: "2px", left: "45px" }}
                                >
                                    {new_kots && new_kots.length}
                                </span>
                                <i className="si si-bell fa-2x" /> <br />
                                New
                                <Ink duration="500" hasTouch="true" />
                            </div>
                        </Tab>
                        <Tab>
                            <div className="text-center">
                                <span
                                    className="cart-quantity-badge"
                                    style={{ backgroundColor: "#f44336", top: "2px", left: "45px" }}
                                >
                                    {accept_kots && accept_kots.length}
                                </span>
                                <i className="si si-grid fa-2x" /> <br />
                                Accepted
                                <Ink duration="500" hasTouch="true" />
                            </div>
                        </Tab>
                        <Tab>
                            <div className="text-center">
                                <span
                                    className="cart-quantity-badge"
                                    style={{ backgroundColor: "#f44336", top: "2px", left: "45px" }}
                                >
                                    {complete_kots && complete_kots.length}
                                </span>
                                <i class="si si-bag fa-2x"></i> <br />
                                Completed
                                <Ink duration="500" hasTouch="true" />
                            </div>
                        </Tab>
                        <Tab>
                            <div className="text-center">
                                <i className="si si-user fa-2x" /> <br />{" "}
                                {localStorage.getItem("deliveryFooterAccount")}
                                <Ink duration="500" hasTouch="true" />
                            </div>
                        </Tab>
                    </TabList>
                    </div>

                    <TabPanel>
                        {!this.props.kots.new_kots ? (
                            <></>
                        ) : (
                        <NewKots
                            kitchen_user={this.props.kitchen_user}
                            refreshOrders={this.__refreshOrders}
							new_kots={this.props.kots.new_kots}
                        />
                        )}
                    </TabPanel>
                    <TabPanel>
                        {!this.props.kots.accept_kots ? (
                            <></>
                        ) : (
                        <AcceptedKots
                            kitchen_user={this.props.kitchen_user}
                            refreshOrders={this.__refreshOrders}
							accept_kots={this.props.kots.accept_kots}
                        />
                        )}
                    </TabPanel>
                    <TabPanel>
                        {!this.props.kots.complete_kots ? (
                            <></>
                        ) : (
                        <CompletedOrders
                            kitchen_user={this.props.kitchen_user}
                            refreshOrders={this.__refreshOrders}
							complete_kots={this.props.kots.complete_kots}
                        />
                        )}
                    </TabPanel>
                    <TabPanel>
                        <Account
                            kitchen_user={this.props.kitchen_user}
                            logoutKitchenUser={this.props.logoutKitchenUser}
                        />
                    </TabPanel>
                </Tabs>
            </React.Fragment>
        )

    }

}

const mapStateToProps = (state) => ({
	kitchen_user: state.kitchen_user.kitchen_user,
	kots: state.kots.kots,
});

export default connect(
	mapStateToProps,
	{ getKots, logoutKitchenUser }
) (Kots);