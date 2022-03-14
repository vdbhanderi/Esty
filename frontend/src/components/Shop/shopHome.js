import React, { Component } from 'react';
import NavBar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import '../Cart/cart.css';
import axios from 'axios';

export default class ShopHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopName: [],
            shopId: "",
            shopImage: "",
            itemList: [],
            shopEmail: "",
            shopPhone: ""

        }

    }
    //get the shop data from backend  
    componentDidMount() {
        // let data = {
        //     useremail: localStorage.getItem("userEmail"),
        //     userName: localStorage.getItem("userName"),
        //     shopId: localStorage.getItem("shopID")
        // }
        var userId=this.props.id
        axios.get('http://localhost:3001/getItemListbyUserID', userId)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    itemList: this.state.itemList.concat(response.data)
                });
            });
    }
    render() {
        let itemrows = this.state.itemList.map(item => {
            return (
                <tr>

                    <td class="border-0 align-middle"><strong>{item.itemname}</strong></td>
                    <td class="border-0 align-middle"><strong>{item.price}</strong></td>
                    <td class="border-0 align-middle"><strong>{item.salecount}</strong></td>

                </tr>

            )
        })
        return (
            <div className="">
                <NavBar />
                <div className="cart">

                    <section class="py-5">
                        <div class="container px-4 px-lg-5 ">
                            <div class="row justify-content-between mb-5">
                                <div className="col-lg-4 ">
                                    <div className='row'>
                                        <div className="card p-5">
                                            <div class='row'>
                                                <div className="text-start col-3">
                                                    <img className="img-account-profile rounded-circle mb-2 " src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                </div>
                                                <div className="col-lg-9">
                                                    <p class="h2 fw-bold">Shop Name</p>
                                                    <p class="h2 fw-bold">{this.state.shopName}</p>
                                                    <button className="btn btn-primary" id="nextButton" name='nextButton' style={{ visibility: 'hidden', float: 'right' }} type="submit">Edit Shop</button>

                                                    <button className="btn btn-primary" type="button">Edit Shop</button>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className="col-lg-4 ">
                                    <div className='row'>
                                        <div className="card p-2">
                                            <div class='card-body text-start'>
                                                
                                                    <p class="h4 fw-bold">Contact</p>
                                                    <p class=" "> Owner Name : {this.state.shopName}</p>
                                                    <p class=""> Email : {this.state.shopName}</p>
                                                    <p class=""> Phone : {this.state.Phone}</p>

                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                    <p class="h2 fw-bold  p-3">Items list</p>
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="p-2 px-3 text-uppercase">Item Name</div>
                                                    </th>
                                                 
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="py-2 text-uppercase">Price</div>
                                                    </th>
                                                    <th scope="col" class="border-0 bg-light">
                                                        <div class="py-2 text-uppercase">Sales</div>
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
                <Footer />
            </div>

        )
    }
}
