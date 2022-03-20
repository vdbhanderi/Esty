import React, { Component } from 'react';
import NavBar from '../Navbar/navbar';
import './cart.css';
import axios from 'axios';
import { Navigate } from 'react-router';
import backendUrl from '../config';
class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            itemid: '',
            itemimage: "",
            salecount: '',
            itemname: '',
            quantity: '',
            totalprice: "",
            isLoaded: false,
            isAddedIntoCart: false
        }
        this.CheckOut = this.CheckOut.bind(this);
    }
    //get the books data from backend  
    componentDidMount() {
        var data = {
            userId: localStorage.getItem("userId"),
            cartId: localStorage.getItem("cartId")
        }
        axios.post(`${backendUrl}/api/getCart`, data)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    var parseData = JSON.parse(response.data.items);
                    parseData = JSON.parse(response.data.items);
                    console.log(parseData)
                    var totalprice=0;
                    parseData.forEach(element => {
                        totalprice += (element.quantity * element.price)
                    });
                    this.setState({
                        totalprice: totalprice,
                        items: this.state.items.concat(parseData)
                    });
                    console.log("stare", this.state.items);
                }
                else {
                    alert("your cart is Empty")
                }
            });
    }

    CheckOut = () => {
        var data = {
            userId: localStorage.getItem("userId"),
            cartId: localStorage.getItem("cartId")
        }
        localStorage.removeItem("cartId")

        axios.post(`${backendUrl}/api/checkOut`, data)
            .then((response) => {
                console.log(response)

                if (response.status === 200) {

                    this.setState({
                        isAddedIntoCart: true
                    })
                }
                else {
                    alert("Please try Again")
                }
            });
    }
    render() {
        let itemrows = this.state.items.map(item => {
            return (
                <tr>
                    <th scope="row" className="border-0">
                        <div className="p-2">
                            {/* <img src={item.itemimage} alt="" width="70" className="img-fluid rounded shadow-sm" /> */}
                            <div className="ms-3 d-inline-block align-middle">
                                <h5 className="mb-0"> <a href="#s" className="text-dark d-inline-block align-middle">{item.itemName}</a></h5>
                            </div>
                        </div>
                    </th>
                    <td className="border-0 align-middle"><strong>{item.price}</strong></td>
                    <td className="border-0 align-middle"><strong>{item.quantity}</strong></td>
                </tr>

            )
        })
        var redirectVar=null
        if (this.state.isAddedIntoCart) {
            redirectVar = <Navigate to="/purchase" />
        }
        return (
            <div className="">
                {redirectVar}
                <NavBar />
                <div className="cart">

                    <section className="py-5">
                        <div className="container px-4 px-lg-5 ">
                            <div className="row">
                                <div className="col-lg-6 p-5 bg-white rounded shadow-sm mb-5">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">Product</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Price</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Quantity</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {itemrows}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                <div className="col-lg-6 p-5 bg-white rounded shadow-sm mb-5">
                                    <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary </div>
                                    <div className="p-4">
                                        <p className="mb-4"><em>Shipping and additional costs are calculated based on values you have entered.</em></p>
                                        <ul className="list-unstyled mb-4">
                                            <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>${this.state.totalprice}</strong></li>
                                            {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10</strong></li> */}
                                            <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>$0</strong></li>
                                            <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                                <h5 className="fw-bold">${parseFloat(this.state.totalprice).toFixed(2)}</h5>
                                            </li>
                                        </ul><a href="/purchase" className="btn btn-dark rounded-pill py-2 d-md-block text-light" onClick={this.CheckOut}>Procceed to checkout</a>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>
                </div>
            </div>

        )
    }
}
export default Cart;