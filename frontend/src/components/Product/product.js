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

export default class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: "",
            itemid: '',
            itemImage: "",
            salecount: '',
            itemName: '',
            price: "",
            isLoaded: false
        }
  
    }

    async componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username"),
            itemid: localStorage.getItem("itemId"),
        }
        console.log("Inside get after component did mount",data.itemid);

        await axios.post('http://localhost:3000/api/getItem', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.setState({
                        description: response.data.description,
                        itemid: data.itemid,
                        itemname: response.data.itemName,
                        itemImage: response.data.itemImage,
                        salecount: response.data.totalSale,
                        price: response.data.price,
                        isLoaded: true
                    })
                }
                else {
                    this.setState({
                        isLoaded: false
                    })
                }
            });
    }
    AddToCart=async()=>{
         const quantity= $('.quantity').val();
         let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username"),
            itemid: localStorage.getItem("itemId"),
        }
         await axios.post('http://localhost:3000/api/addToCart', data)
         .then(response => {
             console.log("Status Code : ", response.status);
             console.log("Status Code : ", response.data);
             if (response.status === 200) {
                
             }
             else {
                 this.setState({
                     isLoaded: false
                 })
             }
         });
    }
    render() {


        return (
            <div>
                <NavBar />
                <div className="container">
                    <div className="product-content product-wrap clearfix product-deatil">

                        <div className="card mb-3 profileCard" >
                            <div className="row g-0 bottomPad">
                                <div className="col-md-6 customOverlay">
                                    <img src={this.state.itemImage} className="figure-img img-fluid rounded customImg" style={{width:'647px'}} alt="..." />
                                    <button className="btn"><i className="bi bi-heart"></i></button>
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body text-start">
                                        <h4 className="card-title fw-bolder">My product: {this.state.itemName}</h4>
                                        <div className="border-bottom">

                                            <h6 className="card-subtitle mb-2 text-muted   d-inline">Shop Name</h6>  <h6 className="card-subtitle mb-2 text-muted   d-inline" >| Total Sales:{this.state.salecount}</h6>
                                        </div>
                                        <p className="card-text">With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.</p>
                                        <p className="card-text">{this.state.description}</p>
                                        <h6 className="card-subtitle mb-2 d-inline">Price: </h6><h6 className="card-subtitle mb-2 d-inline"> $</h6> <h6 className="card-subtitle mb-2 d-inline">{this.state.price}</h6>
                                        <div className="mb-3 col-md-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Quantity:</label>
                                            <input type="number" className="form-control" id="exampleFormControlInput1" min="1" placeholder="Qunatity" name='quantity'/>
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



