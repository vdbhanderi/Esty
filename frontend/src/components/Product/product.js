import React, { Component } from "react";

// import {Link} from "react-router-dom";
//import { Formik, Form, Field, ErrorMessage } from "formik";
//import * as Yup from "yup";
import axios from 'axios';
import './product.css';
///import rootUrl from "../config/settings";
//import swal from "sweetalert"
//import user_image from "../../images/user_defaultimage.png"
import NavBar from '../Navbar/navbar'
import $ from 'jquery'
import { Navigate } from "react-router";

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: "",
            itemid: '',
            itemImage: "",
            shopName:'',
            shopId:'',
            salecount: '',
            itemName: '',
            price: "",
            isAddedIntoCart: false
        }
    }
    async componentDidMount() {
        let data = {
            username: localStorage.getItem("username"),
            itemid: localStorage.getItem("itemId"),
        }
        console.log("Inside get after component did mount", data.itemid);

        await axios.post('http://localhost:3000/api/getItem', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.setState({
                        description: response.data.description,
                        itemid: data.itemid,
                        itemName: response.data.itemName,
                        shopName: response.data.shopName,
                        shopId: response.data.shopId,
                        itemImage: response.data.itemImage,
                        salecount: response.data.totalSale,
                        price: response.data.price,
                    })
                }
                else {
                    this.setState({
                    })
                }
            });
    }
    AddToCart = async () => {
        console.log(this.state.itemid)
        console.log(this.state.price)
        const quantity = $('#quantity').val();
        const cartId = localStorage.getItem("cartId");
        console.log(cartId)
        const userId = localStorage.getItem("userId");
        let data = {
            item: {
                itemId: this.state.itemid,
                itemName: this.state.itemName,
                itemImage: this.state.itemImage,
                shopName: this.state.shopName,
                price: this.state.price,
                quantity: quantity,
            },
            userId: userId,
            cartId: cartId,
        }
        await axios.post('http://localhost:3000/api/addToCart', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data.insertId)
                    localStorage.setItem('cartId', response.data.insertId);
                    this.setState({
                        isAddedIntoCart: true
                    })
                }
            });
    }
    updateShopId=(e)=>{
        console.log(e.target.id)
       localStorage.setItem("shopId",e.target.id)
    }
    render() {
        console.log("cartId",localStorage.getItem('cartId'))
        let redirectVar = null;
        if (this.state.isAddedIntoCart) {
            redirectVar = <Navigate to="/cart" />
        }
        return (
            <div>
                {redirectVar}
                <NavBar />
                <div className="container">
                    <div className="product-content product-wrap clearfix product-deatil">

                        <div className="card mb-3 profileCard" >
                            <div className="row g-0 bottomPad">
                                <div className="col-md-6 customOverlay">
                                    <img src={this.state.itemImage} className="figure-img img-fluid rounded customImg" style={{ width: '647px',height: '647px' }} alt="..." />
                                    <button className="btn"><i className="bi bi-heart"></i></button>
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body text-start">
                                        <h4 className="card-title fw-bolder">Product : {this.state.itemName}</h4>
                                        <div className="border-bottom">

                                            <h6 className="card-subtitle mb-2 text-muted   d-inline">Shop : <a href={`/shopHome/${this.state.shopId}`} id={this.state.shopId} onClick={this.updateShopId}>{this.state.shopName}</a></h6>  <h6 className="card-subtitle mb-2 text-muted   d-inline" >| Total Sales:{this.state.salecount}</h6>
                                        </div>
                                        <p className="card-text"><strong>Description : </strong> {this.state.description}</p>
                                        <p className="card-text"></p>
                                        <h6 className="card-subtitle mb-2 d-inline">Price: </h6><h6 className="card-subtitle mb-2 d-inline"> $</h6> <h6 className="card-subtitle mb-2 d-inline">{this.state.price}</h6>
                                        <div className="mb-3 col-md-3">
                                            <label htmlFor="quantity" className="form-label">Quantity:</label>
                                            <input type="number" className="form-control" id="quantity" min="1" placeholder="Qunatity" name='quantity' />
                                        </div>
                                        <div className="d-grid col-md-6 d-inline">
                                            <button type="button" className="btn btn-outline-primary rounded" onClick={this.AddToCart}>
                                                Add to Cart
                                            </button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>




            </div>
        )
    }
}



