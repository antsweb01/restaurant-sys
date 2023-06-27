import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";

import messaging from "../../init-fcm";
import { saveNotificationToken } from "../../services/notification/actions";
import { logoutKitchenUser } from "../../services/Kitchen/user/action";
import Account from "./Account";
import NewKots from "./NewKots";

import Ink from "react-ink";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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

                    <Tabs>
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
                                        { kitchen_user.data.newKotCount }
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
                                        { kitchen_user.data.acceptedKotCount }
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
                                        { kitchen_user.data.completedOrderCount }
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
                            <NewKots
                                kitchen_user={this.props.kitchen_user}
                            />
                        </TabPanel>
                        <TabPanel>
                            <div className="tab_theme_2 vh-100 dark-bg">
                                <div className="light-bg">
                                    <div className="container d-flex justify-content-between">
                                        <div class="delivery-tab-title px-20 py-15">Accepted KOTs</div>
                                        <div className="delivery-order-refresh">
                                            <button
                                                className="btn btn-refreshOrders mr-15"
                                                onClick=""
                                                style={{ position: "relative" }}
                                            >
                                                Refresh <i ref="btnSpinner" className="fa fa-refresh" />
                                                <Ink duration={1200} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="tab_theme_2 vh-100 dark-bg">
                                <div className="light-bg">
                                    <div className="container d-flex justify-content-between">
                                        <div class="delivery-tab-title px-20 py-15">Completed Orders</div>
                                        <div className="delivery-order-refresh">
                                            <button
                                                className="btn btn-refreshOrders mr-15"
                                                onClick=""
                                                style={{ position: "relative" }}
                                            >
                                                Refresh <i ref="btnSpinner" className="fa fa-refresh" />
                                                <Ink duration={1200} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

}

const mapStateToProps = (state) => ({
	kitchen_user: state.kitchen_user.kitchen_user,
});

export default connect(
	mapStateToProps,
	{ saveNotificationToken, logoutKitchenUser }
) (Kitchen);