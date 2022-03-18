import React, { Component } from 'react';
import NavBar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import '../Cart/cart.css';
import axios from 'axios';

export default class Purchase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderedItems: [],
            isLoaded: false
        }

    }
    //get the books data from backend  
    componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username")
        }

     axios.post('http://localhost:3000/getOrderedItems', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    orderedItems: this.state.orderedItems.concat(response.data)
                });
            });
    }
    render() {
        let itemrows = this.state.orderedItems.map(item => {
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
                    <td class="border-0 align-middle"><strong>{item.shopname}</strong></td>
                    <td class="border-0 align-middle"><strong>{item.dop}</strong></td>
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
                                <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                    <p class="h2 fw-bold  p-3">My Purchases</p>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="p-2 px-3 text-uppercase">Product</div>
                                                    </th>
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="py-2 text-uppercase">Shop Name</div>
                                                    </th>
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="py-2 text-uppercase">Date of Purchase</div>
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

                            </div>


                        </div>
                    </section>
                </div>
                 <Footer/>
            </div>

        )
    }
}
