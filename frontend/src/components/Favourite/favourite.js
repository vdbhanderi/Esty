import axios from "axios";
import React, { Component } from "react";
//import { Link } from "react-router-dom";
import Footer from "../Footer/footer";
//import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
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
        this.handleFilterFavourite = this.handleFilterFavourite.bind(this);
        this.handleFavourite = this.handleFavourite.bind(this);

        this.goToProduct = this.goToProduct.bind(this);

    }

    //get the books data from backend  
    componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            userName: localStorage.getItem("userName"),
            userId: localStorage.getItem("userId"),

        }

        axios.post('http://localhost:3000/api/getFavouriteItemsbyUserID', data)
            .then((response) => {
                //update the state with the response data
                console.log(response.data)
                this.setState({
                    items: this.state.items.concat(response.data)
                });
            });
    }
    handleFavourite = (e) => {
        console.log("inside favourite");
        var itemId = e.target.id
        console.log("itemId",itemId)
        let data = {
            itemId: itemId,
            userId: localStorage.getItem("userId")
        }
        var favId = this.state.items.filter(x => x.itemId === parseInt(itemId))[0].favouriteId
        console.log("fav",favId)
         if (favId == null) {
             axios.post('http://localhost:3000/api/addFavourite', data)
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
             axios.post('http://localhost:3000/api/removeFavourite', data)
                 .then((response) => {
                     console.log(response.data) 
             });
         }
         window.location.reload()

       //   $(".heart").html("&#9825;");
    }
    handleFilterFavourite = (e) => {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            userName: localStorage.getItem("userName"),
            userId: localStorage.getItem("userId"),

        }

        axios.post('http://localhost:3000/api/getFavouriteItemsbyUserID', data)
            .then((response) => {
                //update the state with the response data
                console.log(response.data)
                this.setState({
                    items: this.state.items.concat(response.data)
                });
            });
    }
    goToProduct = (e) => {
        console.log(e.target.id)
        localStorage.setItem('itemId',e.target.id)
    }

    render() {

        let itemrows = this.state.items.map(item => {
            return (
                <div className="col-md-6 col-lg-4 col-xl-3">
                    <div id="product-4" className="single-product"
                    >
                        <div className="part-1" >
                            <Link to={`/product/${item.itemId}`}>
                                <img alt='' src={`${item.itemImage}`} id={`${item.itemId}`} style={{ "background": `no-repeat center`, "backgroundSize": "cover","width":"290px",height:"290px" }} onClick={this.goToProduct}></img>
                            </Link>
                            {item.favouriteId != null ? <span className="new heart" id={item.itemId} onClick={this.handleFavourite}>&#9829;</span> :
                                <span className="new heart1" id={item.itemId} onClick={this.handleFavourite}>&#9825;</span>}

                        </div>
                        <div className="part-2" >
                            <h3 className="product-title text-start"><strong>Item Name: </strong>:{item.itemName}</h3>
                            <h4 className="product-price text-start" ><strong>Price : </strong> {item.currency ? item.currency.split('-')[0] : null}{item.price}</h4>
                        </div>
                    </div>
                </div>

            )
        })

        return (
            <div>
                <NavBar />
                <div className="card" style={{ width: "18rem", marginLeft: "80px",marginTop: "80px" }}>
                    <div className="card-body">
                        <h5 className="card-title">Profile</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Username:{localStorage.getItem("username")}</h6>
                        <Link to="/profile"><button className="card-link">Edit Profile</button></Link>
                    </div>
                </div>
                <div className="row">
                    <form>
                        <div className="">
                            <input className="form-control customSearch" type="text" placeholder="Search" aria-label="Search" onClick={this.handleFilterFavourite} style={{width:"150px"}}/>
                            {/* <button className="btnsearch"><Link to='/favourite'><i className="bi bi-search"></i></Link></button> */}
                        </div>

                    </form>
                </div>
                <section className="section-products" style={{marginBottom:"100px"}}>
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-md-8 col-lg-6">
                                <div className="header">
                                    <h2>Favourite items</h2>
                                </div>
                            </div>
                        </div>
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

export default Favourite;