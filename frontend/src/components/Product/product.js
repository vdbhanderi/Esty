import React, { Component } from "react";
// import {Link} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import './product.css';
///import rootUrl from "../config/settings";
//import swal from "sweetalert"
import user_image from "../../images/user_defaultimage.png"
import NavBar from '../Navbar/navbar'

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const zipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/

const UpdateProfileSchema = Yup.object().shape({
    username: Yup.string()
        .required("userName is required"),


});

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decription: "",
            shopname: "",
            itemid: '',
            itemimage: "",
            salecount: '',
            itemname: '',
            quantity: '',
            profileImage: "",
            price: "",
            isLoaded: false
        }

    }

    async componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username")

        }
        console.log("Inside get profile after component did mount");

        axios.post('http://localhost:3000/getItem', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        decription: response.data.decription,
                        itemid: data.itemid,
                        shopname: response.data.shopname,
                        itemname: response.data.itemname,
                        itemimage: response.data.itemimage,
                        salecount: response.data.salecount,
                        price: response.data.price,
                        city: response.data.city,
                        quantity: response.data.quantity,
                        isLoaded: true
                    })
                }
                else {
                    this.setState({
                        isLoaded: false
                    })
                }
            });

        console.log("state updated", this.state)
        console.log("Profile image name", this.profileImage);
    }
    render() {


        return (
            <div>
                <NavBar />
                <div class="container">
                    <div class="product-content product-wrap clearfix product-deatil">

                        <div class="card mb-3" >
                            <div class="row g-0 bottomPad">
                                <div class="col-md-6 customOverlay">
                                    <img src={this.state.salecount} class="figure-img img-fluid rounded customImg" alt="..." />
                                    <button class="btn"><i class="bi bi-heart"></i></button>
                                </div>
                                <div class="col-md-6">
                                    <div class="card-body text-start">
                                        <h4 class="card-title fw-bolder">My product: {this.state.itemname}</h4>
                                        <div className="border-bottom">

                                            <h6 class="card-subtitle mb-2 text-muted   d-inline">Shop Name</h6>  <h6 class="card-subtitle mb-2 text-muted   d-inline" >| Total Sales:{this.state.salecount}</h6>
                                        </div>
                                        <p class="card-text">With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.</p>
                                        <p class="card-text">With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.</p>
                                        <h6 class="card-subtitle mb-2 d-inline">Price: </h6><h6 class="card-subtitle mb-2 d-inline"> $</h6> <h6 class="card-subtitle mb-2 d-inline">{this.state.price}</h6>
                                        <div class="mb-3 col-md-3">
                                            <label for="exampleFormControlInput1" class="form-label">Quantity:</label>
                                            <input type="number" class="form-control" id="exampleFormControlInput1" min="1" placeholder="Qunatity" value={this.state.quantity}/>
                                        </div>
                                        <div className="d-grid col-md-6 d-inline">
                                            <button type="button" className="btn btn-outline-primary rounded">
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



