import React, { Component } from "react";

import { Redirect } from "react-router";
import { connect } from "react-redux";

import Ink from "react-ink";

class NewKots extends Component {

    componentDidMount() {
        const { kitchen_user } = this.props;
    }

    render() {
        
        return(
            <React.Fragment>
                <div className="tab_theme_2 vh-100 dark-bg">
                    <div className="light-bg">
                        <div className="container d-flex justify-content-between">
                            <div class="delivery-tab-title px-20 py-15">New KOTs</div>
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
            </React.Fragment>
        )
        
    }

}

const mapStateToProps = (state) => ({
	kitchen_user: state.kitchen_user.kitchen_user,
});

export default connect(
    mapStateToProps,
) (NewKots);