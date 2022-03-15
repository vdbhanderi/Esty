import axios from "axios";
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Footer from "../Footer/footer";
//import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
import { Navigate } from 'react-router';
import NavBar from "../Navbar/navbar";
import './dashboard.css'


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            redirectVar: null

        }
        this.handleFavourite=this.handleFavourite.bind(this);
    }

    //get the books data from backend  
    componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username")

        }

        axios.get('http://localhost:3001/api/itemList', data)
            .then((response) => {
                //update the state with the response data
                this.setState({
                    items: this.state.items.concat(response.data)
                });
            });
    }
    handleFavourite=()=>{
           
    }
    changeColor=()=>{
        <Navigate to="/somewhere/else" />

    }

    render() {
    
        let itemrows = this.state.items.map(item => {
            return (
                <div className="col-md-6 col-lg-4 col-xl-3">
                <div id="product-4" className="single-product" 
                onClick = {this.changeColor}>
                        <div className="part-1" style={{ "background":`url(${item.itemImage}) no-repeat center`, "background-size": "cover"}}>
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
                <section className="section-products">
                    <div className="container">
                        {/* <div className="row justify-content-center text-center">
						<div className="col-md-8 col-lg-6">
								<div className="header">
										<h3>Featured Product</h3>
										<h2>Popular Products</h2>
								</div>
						</div>
				</div> */}
                        <div className="row">
                            {itemrows}

                        </div>
                    </div>
                </section>
                <Footer />
            </div>

        );
    }
}

export default DashBoard;