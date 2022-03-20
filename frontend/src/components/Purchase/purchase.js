import React, { Component } from 'react';
import NavBar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import '../Cart/cart.css';
import axios from 'axios';
import { Navigate } from 'react-router';

export default class Purchase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderedItems: [],
            isLoaded: false,
            redirect: null,
        }

    }
    //get the books data from backend  
    componentDidMount() {
        let data = {
            username: localStorage.getItem("username"),
            cartId: localStorage.getItem("cartId"),
            userId: localStorage.getItem("userId")
        }
        let userId = localStorage.getItem('userId');
        if (!userId) {
            this.setState({
                redirect: <Navigate to='/' />
            })
            return
        }
     axios.post('http://localhost:3000/api/getOrderedItems', data)
            .then((response) => {
                //update the state with the response data
                console.log(response.data)
                this.setState({
                    orderedItems: this.state.orderedItems.concat(response.data)
                });
            });
    }
    render() {
        let itemrows = this.state.orderedItems.map(item => {
            return (
                <tr>
                    <th scope="row" className="border-0">
                        <div className="p-2">
                            <img src={item.itemImage} alt="" width="70" className="img-fluid rounded shadow-sm" />
                            <div className="ms-3 d-inline-block align-middle">
                                <h5 className="mb-0"> <a href="#s" className="text-dark d-inline-block align-middle">{item.itemName}</a></h5>
                            </div>
                        </div>
                    </th>
                    <td className="border-0 align-middle"><strong>{item.shopName}</strong></td>
                    <td className="border-0 align-middle"><strong>{item.purchaseDate}</strong></td>
                    <td className="border-0 align-middle"><strong>{item.price}</strong></td>
                    <td className="border-0 align-middle"><strong>{item.quantity}</strong></td>

                </tr>

            )
        })
        return (
            <div className="">
                 {this.state.redirect}
                <NavBar />
                <div className="cart">

                    <section className="py-5">
                        <div className="container px-4 px-lg-5 ">
                            <div className="row">
                                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                    <p className="h2 fw-bold  p-3">My Purchases</p>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">Product</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Shop Name</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Date of Purchase</div>
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

                            </div>


                        </div>
                    </section>
                </div>
                 <Footer/>
            </div>

        )
    }
}
