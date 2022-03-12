import axios from "axios";
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Footer from "../Footer/footer";
//import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
import { Navigate } from 'react-router';
import NavBar from "../Navbar/navbar";
import '../Favourite/favourite.css'
import { Link } from "react-router-dom";


class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            redirectVar: null

        }
        this.handleFavourite = this.handleFavourite.bind(this);
    }

    //get the books data from backend  
    componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username")

        }

        axios.get('http://localhost:3001/favouriteList', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    items: this.state.items.concat(response.data)
                });
            });
    }
    handleFavourite = () => {

    }
    changeColor = () => {
        <Navigate to="/" />

    }

    render() {

        let itemrows = this.state.items.map(item => {
            return (
                <div className="col-md-6 col-lg-4 col-xl-3">
                    <div id="product-4" className="single-product"
                        onClick={this.changeColor}>
                        <div className="part-1" style={{ "background": `url(${item.itemImage}) no-repeat center`, "background-size": "cover" }}>
                            <span className="new"><i className="bi bi-heart" onClick={this.handleFavourite}></i></span>
                        </div>
                        <div className="part-2" >
                            <h3 className="product-title text-start">{item.itemname}</h3>
                            <h4 className="product-price text-start" >{item.currency}{item.price}</h4>
                        </div>
                    </div>
                </div>

            )
        })
        //     let itemList = this.state.items.map(item => {
        //     return (

        //         <div className="col-md-6 col-lg-4 col-xl-3">
        // 							<div id="product-4" className="single-product">
        // 									<div className="part-1" style={{ "background-image":URL("https://i.ibb.co/cLnZjnS/2.jpg")}}>
        // 											<span className="new"><a href="#11"><i className="bi bi-heart"></i></a></span>

        // 									</div>
        // 									<div className="part-2">
        // 											<h3 className="product-title text-start">{item.itemname}</h3>
        // 											<h4 className="product-price text-start" >{item.currency}{item.price}</h4>
        // 									</div>
        // 							</div>
        // 					</div>
        //     )
        // })
        return (
            <div>
                <NavBar />
                <div class="card" style={{ width: "18rem", marginLeft: "80px" }}>
                    <div class="card-body">
                        <h5 class="card-title">Profile</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Username:{localStorage.getItem("username")}</h6>
                        <button href="#a" class="card-link">Edit Profile</button>
                    </div>
                </div>
                <div className="row">
                    <form>
                        <div className="">
                            <input class="form-control customSearch" type="text" placeholder="Search" aria-label="Search" />
                            {/* <button className="btnsearch"><Link to='/favourite'><i className="bi bi-search"></i></Link></button> */}
                        </div>

                    </form>
                </div>
                <section className="section-products">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-md-8 col-lg-6">
                                <div className="header">
                                    <h2>Favourite items</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div id="product-4" className="single-product"
                                    onClick={this.changeColor}>
                                    {/* <div className="part-1" style={{ "background": `url(.itemImage) no-repeat center`, "background-size": "cover" }}> */}
                                    <div className="part-1" >
                                    </div>
                                    <div className="part-2" >
                                        <h3 className="product-title text-start">itemname</h3>
                                        <h4 className="product-price text-start" >currencyprice</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div id="product-4" className="single-product"
                                    onClick={this.changeColor}>
                                    {/* <div className="part-1" style={{ "background": `url(.itemImage) no-repeat center`, "background-size": "cover" }}> */}
                                    <div className="part-1" >
                                    </div>
                                    <div className="part-2" >
                                        <h3 className="product-title text-start">itemname</h3>
                                        <h4 className="product-price text-start" >currencyprice</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div id="product-4" className="single-product"
                                    onClick={this.changeColor}>
                                    {/* <div className="part-1" style={{ "background": `url(.itemImage) no-repeat center`, "background-size": "cover" }}> */}
                                    <div className="part-1" >
                                    </div>
                                    <div className="part-2" >
                                        <h3 className="product-title text-start">itemname</h3>
                                        <h4 className="product-price text-start" >currencyprice</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div id="product-4" className="single-product"
                                    onClick={this.changeColor}>
                                    {/* <div className="part-1" style={{ "background": `url(.itemImage) no-repeat center`, "background-size": "cover" }}> */}
                                    <div className="part-1" >
                                    </div>
                                    <div className="part-2" >
                                        <h3 className="product-title text-start">itemname</h3>
                                        <h4 className="product-price text-start" >currencyprice</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 col-xl-3">
                                <div id="product-4" className="single-product"
                                    onClick={this.changeColor}>
                                    {/* <div className="part-1" style={{ "background": `url(.itemImage) no-repeat center`, "background-size": "cover" }}> */}
                                    <div className="part-1" >
                                    </div>
                                    <div className="part-2" >
                                        <h3 className="product-title text-start">itemname</h3>
                                        <h4 className="product-price text-start" >currencyprice</h4>
                                    </div>
                                </div>
                            </div>
                            {itemrows}

                        </div>
                    </div>
                </section>
                <Footer />
            </div>

        );
    }
}

export default Favourite;