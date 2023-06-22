import React, { Component } from "react";

import Ink from "react-ink";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Kitchen extends Component {

    render() {
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
                                    1
                                </span>
                                <i className="si si-bell fa-2x" /> <br />
                                New Orders
                                <Ink duration="500" hasTouch="true" />
                            </div>
                        </Tab>
                        <Tab>
                            <div className="text-center">
                                <span
                                    className="cart-quantity-badge"
                                    style={{ backgroundColor: "#f44336", top: "2px", left: "45px" }}
                                >
                                    1
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
                                    1
                                </span>
                                <i class="si si-bag fa-2x"></i> <br />
                                Completed
                                <Ink duration="500" hasTouch="true" />
                            </div>
                        </Tab>
                    </TabList>
                    </div>

                    <TabPanel>
                        <div className="tab_theme_2 vh-100 dark-bg">
                            <div className="light-bg">
                                <div className="container d-flex justify-content-between">
                                    <div class="delivery-tab-title px-20 py-15">New Orders</div>
                                    <div className="delivery-order-refresh">
                                        <button
                                            className="btn btn-refreshOrders mr-15"
                                            onClick=""
                                            style={{ position: "relative" }}
                                        >
                                            Refresh 
                                            <i ref="btnSpinner" className="fa fa-refresh" />
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
                                    <div class="delivery-tab-title px-20 py-15">Accepted Orders</div>
                                    <div className="delivery-order-refresh">
                                        <button
                                            className="btn btn-refreshOrders mr-15"
                                            onClick=""
                                            style={{ position: "relative" }}
                                        >
                                            Refresh 
                                            <i ref="btnSpinner" className="fa fa-refresh" />
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
                                            Refresh 
                                            <i ref="btnSpinner" className="fa fa-refresh" />
                                            <Ink duration={1200} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>

            </React.Fragment>
        )
    }

}

export default (Kitchen);