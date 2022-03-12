import React, { Component } from 'react';
import NavBar from '../Navbar/navbar';
import './cart.css';
import axios from 'axios';
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
            profileImage: "",
            totalprice: "",
            isLoaded: false
        }

    }
 //get the books data from backend  
 componentDidMount(){
     var data={
          itemids:localStorage.getItem("items")
     }

    axios.get('http://localhost:3001/getitems',data)
            .then((response) => {
            //update the state with the response data
            this.setState({
                items : this.state.items.concat(response.data) 
            });
        });
}
    render() {
        let itemrows = this.state.items.map(item => {
            return (
                <tr>
                    <th scope="row" class="border-0">
                        <div class="p-2">
                            <img src={item.itemimage} alt="" width="70" class="img-fluid rounded shadow-sm" />
                            <div class="ms-3 d-inline-block align-middle">
                                <h5 class="mb-0"> <a href="#s" class="text-dark d-inline-block align-middle">{item.itemname}</a></h5>
                            </div>
                        </div>
                    </th>
                    <td class="border-0 align-middle"><strong>{item.price}</strong></td>
                    <td class="border-0 align-middle"><strong>{item.quantity}</strong></td>
                </tr>

            )
        })
        return (
            <div className="">
                <NavBar />
                <div className="cart">

                    <section class="py-5">
                        <div class="container px-4 px-lg-5 ">
                            <div class="row">
                                <div class="col-lg-6 p-5 bg-white rounded shadow-sm mb-5">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="p-2 px-3 text-uppercase">Product</div>
                                                    </th>
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="py-2 text-uppercase">Price</div>
                                                    </th>
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="py-2 text-uppercase">Quantity</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               {itemrows}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                <div class="col-lg-6 p-5 bg-white rounded shadow-sm mb-5">
                                    <div class="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary </div>
                                    <div class="p-4">
                                        <p class="mb-4"><em>Shipping and additional costs are calculated based on values you have entered.</em></p>
                                        <ul class="list-unstyled mb-4">
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>$390.00</strong></li>
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Shipping and handling</strong><strong>$10.00</strong></li>
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax</strong><strong>$0.00</strong></li>
                                            <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                                                <h5 class="fw-bold">$400.00</h5>
                                            </li>
                                        </ul><a href="/purchase" class="btn btn-dark rounded-pill py-2 d-md-block text-light">Procceed to checkout</a>
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