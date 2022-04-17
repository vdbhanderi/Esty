import axios from "axios";
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Footer from "../Footer/footer";
//import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
import NavBar from "../Navbar/navbar";
import './dashboard.css'
import { Link } from "react-router-dom";
import  backendUrl  from "../config";

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            redirectVar: null

        }
        this.handleFavourite = this.handleFavourite.bind(this);
        this.goToProduct = this.goToProduct.bind(this);
    }

    //get the books data from backend  
    componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username"),
            search: localStorage.getItem("search")
        }
        console.log(localStorage.getItem("search"))
        if (localStorage.getItem("search") === null || localStorage.getItem("search") === "") {
            axios.post(`${backendUrl}/api/getItemListForDashboard`, data)
                .then((response) => {
                    console.log( typeof (response.data))
                    //update the state with the response data

                    this.setState({
                        items: this.state.items.concat(response.data)
                    });
                });
        }
        else {
            axios.post(`${backendUrl}/api/getItemListForDashboardbySearch`, data)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        items: this.state.items.concat(response.data)
                    });
                });

        }



    }
    componentWillUnmount() {
        localStorage.removeItem("search")
    }
    handleFavourite = (e) => {
        console.log("inside favourite");
        var itemId = e.target.id
        console.log("itemId", itemId)
        let data = {
            itemId: itemId,
            userId: localStorage.getItem("userId")
        }
        var favId = this.state.items.filter(x => x.itemId === parseInt(itemId))[0].favouriteId
        console.log("fav", favId)
        if (favId == null) {
            axios.post(`${backendUrl}/api/addFavourite`, data)
                .then((response) => {
                    console.log(response.data)
                    this.setState({
                        items: this.state.items.concat(response.data)
                    });
                    this.setState({
                        items: this.state.items.concat(response.data)
                    });
                });
        }
        else {
            axios.post(`${backendUrl}/api/removeFavourite`, data)
                .then((response) => {
                    console.log(response.data)
                });
        }
        window.location.reload()

        //   $(".heart").html("&#9825;");
    }
    changeColor = (e) => {

        var itemId = e.target.id
        let data = {
            itemId: itemId,

        }
        console.log("click function");
        console.log(e.target.id);
        localStorage.setItem('itemId', e.target.id)
        axios.post(`${backendUrl}/api/addFavourite`, data)
            .then((response) => {
                console.log(response.data)
                //update the state with the response data

                this.setState({
                    items: this.state.items.concat(response.data)
                });
            });
    }
    goToProduct = (e) => {
        console.log(e.target.id)
        localStorage.setItem('itemId', e.target.id)
        localStorage.removeItem("search")
    }
    render() {

        let itemrows = this.state.items.map(item => {
            return (
                <div className="col-md-6 col-lg-4 col-xl-3">
                    <div id="product-4" className="single-product"
                    >
                        <div className="part-1" >
                            <Link to={`/product/${item.itemId}`}>
                                {/* <i className="bi bi-heart" id='heart' onClick={this.handleFavourite}></i> */}
                                <img alt='' src={`${item.itemImage}`} id={`${item.itemId}`} style={{ "background": `no-repeat center`, "backgroundSize": "cover", "width":"290px",height:"290px"}} onClick={this.changeColor}></img>
                            </Link>
                            {/* { <span className="new"><i className="" id='heart' onClick={this.handleFavourite}>&#9829;</i></span>	 } */}
                            {item.favouriteId != null && item.userId=== parseInt(localStorage.getItem("userId"))? <span className="new heart" id={item.itemId} onClick={this.handleFavourite}>&#9829;</span> :
                                <span className="new heart1" id={item.itemId} onClick={this.handleFavourite}>&#9825;</span>}
                            {/* <i className="bi bi-heart" id='heart' onClick={this.handleFavourite}></i> */}

                        </div>
                        <div className="part-2" >
                            <h3 className="product-title text-start"><strong>Item Name: </strong>{item.itemName}</h3>
                            <h4 className="product-price text-start" ><strong>Price : </strong> {item.currency ? item.currency.split('-')[0] : null}{item.price}</h4>
                        </div>
                    </div>
                </div>

            )
        })

        return (
            <div>
                <NavBar />
                <section className="section-products" style={{"marginBottom":"100px"}}>
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