import React, { Component } from 'react';

class Payment extends Component {

    state = {
        razorpay_payment_id: "",
        razorpay_signature: "",
        razorpay_order_id: "",

        razorpayKeyIdInput: ""
    };

    fetch = () => {
        return new Promise(resolve => setTimeout(() => resolve(42), 1000));
    }

    openCheckout = () => {
        let options = {
            "key": this.state.razorpayKeyIdInput,
            "amount": 100,
            "name": "Merchant Name",
            "currency": "INR",
            "order_id": this.state.razorpay_order_id,
            "description": "Purchase Description",
            "handler": (response) => {
                console.log(response);
                this.setState({
                    razorpay_order_id: this.state.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                });
            },
            "prefill": {
                "name": "Harshil Mathur",
                "email": "harshil@razorpay.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Hello World"
            },
            "theme": {
                "color": "#F37254"
            }
        };

        let rzp = new window.Razorpay(options);
        rzp.open();
    }

    updateRazorpayKeyValue = (evt) => {
        this.setState({
            razorpayKeyIdInput: evt.target.value
        });
    }

    updateOrderIdValue = (evt) => {
        this.setState({
            razorpay_order_id: evt.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Payment</h1>

                Razorpay Key Id:
                <input
                    id="razorpay_key_id_input"
                    name="razorpay_key_id_input"
                    onChange={this.updateRazorpayKeyValue}
                    style={{ backgroundColor: 'black', marginLeft: 5, color: 'white' }}
                />
                <br />
                Order Id:
                <input
                    id="order_id_input"
                    name="order_id_input"
                    onChange={this.updateOrderIdValue}
                    style={{ backgroundColor: 'black', marginLeft: 5, color: 'white' }}
                />

                <br />
                <button
                    onClick={this.openCheckout}
                    style={{ backgroundColor: 'brown', color: 'white', marginLeft: 5 }}>
                    Pay
                </button>

                <div id="razorpay_order_id" name="razorpay_order_id">
                    {this.state.razorpay_order_id}
                </div>
                <div id="razorpay_payment_id" name="razorpay_payment_id">
                    {this.state.razorpay_payment_id}
                </div>
                <div id="razorpay_signature" name="razorpay_signature">
                    {this.state.razorpay_signature}
                </div>
            </React.Fragment>
        );
    }
}

export default Payment;