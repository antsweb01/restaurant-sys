import React, { Component } from "react";
import Moment from "react-moment";
import Ink from "react-ink";
import { Link } from "react-router-dom";

class AcceptedKots extends Component {

    __refreshOrders = () => {
		if (this.refs.btnSpinner) {
			this.refs.btnSpinner.classList.add("fa-spin");
		}
		setTimeout(() => {
			if (this.refs.btnSpinner) {
				this.refs.btnSpinner.classList.remove("fa-spin");
			}
		}, 2 * 1000);
		this.props.refreshOrders();
	};

    render() {

        const { accept_kots, kitchen_user } = this.props;
        
        return(
            <React.Fragment>
                <div className="tab_theme_2 vh-100 dark-bg">
                    <div className="light-bg mb-3">
                        <div className="container d-flex justify-content-between">
                            <div class="delivery-tab-title px-20 py-15">Accepted KOTs</div>
                            <div className="delivery-order-refresh">
                                <button
                                    className="btn btn-refreshOrders mr-15"
                                    onClick={this.__refreshOrders}
                                    style={{ position: "relative" }}
                                >
                                    Refresh <i ref="btnSpinner" className="fa fa-refresh" />
                                    <Ink duration={1200} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row card-wraper">
                        {kitchen_user.data.status ? (
                            <React.Fragment>
                            {accept_kots.length === 0 ? (
                                <div className="col-12 p-5 text-center no-kots">
                                    <h3 className="mb-2">No</h3>
                                    <h6>Accepted Kitchen Order Tickets</h6>
                                </div>
							) : (
                                <React.Fragment>
                                    {accept_kots.map((kot) => (
                                        <div className="col-12 col-md-6 col-lg-4 mb-3" style={{ marginBottom: "30px" }}>
                                            <div className="card-view">
                                                <Link
                                                    to={`/kitchen/kots/${kot.kot_no}`}
                                                    key={kot.id}
                                                    style={{ position: "relative" }}
                                                >
                                                <div className="card-body">
                                                    <h5 className="card-title">{ kot.unique_order_id }</h5>
                                                    <p className="card-text"><Moment fromNow>{ kot.updated_at }</Moment></p>
                                                    <a href="#" className="btn btn-primary">View Ticket</a>
                                                </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            )}
                            </React.Fragment>
                        ) : (
                            <div className="col-12 pt-100">
                                <div className="delivery-guy-status delivery-guy-offline text-center" style={{ width: "200px", margin: "auto" }}>
                                    <span>You are Offline</span>
                                </div>
                            </div>
					    )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
        
    }

}

export default AcceptedKots;