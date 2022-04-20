import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import Footer from "../Footer/footer";
import NavBar from "../Navbar/navbar";
import './dashboard.css'
import { Link } from "react-router-dom";
import { GetItems } from '../../redux/Actions/dashboardAction'
import backendUrl from "../config";

function DashBoard() {
    var items = useSelector((state) => state.items)
    console.log(typeof items)
    var isLoggedIn = useSelector((state) => state.isLoggedIn)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetItems())
    }, [dispatch, isLoggedIn])
    const HandleFavourite = (e) => {
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

                });
        }
        else {
            axios.post(`${backendUrl}/api/removeFavourite`, data)
                .then((response) => {
                    console.log(response.data)
                });
        }
        window.location.reload()

    }
    var itemrows;
    if (items !== null) {
        itemrows = items.map((item) => (
            <div className="col-md-6 col-lg-4 col-xl-3">
                <div id="product-4" className="single-product"
                >
                    <div className="part-1" >
                        <Link to={`/product/${item._id}`}>
                            <img alt='' src={`${item.itemImage}`} id={`${item._id}`} style={{ "background": `no-repeat center`, "backgroundSize": "cover", "width": "290px", height: "290px" }} ></img>
                        </Link>
                        {item.favouriteId != null && item.userId === localStorage.getItem("userId") ? <span className="new heart" id={item.itemId} >&#9829;</span> :
                            <span className="new heart1" id={item.itemId} onClick={HandleFavourite} >&#9825;</span>}
                    </div>
                    <div className="part-2" >
                        <h3 className="product-title text-start"><strong>Item Name: </strong>{item.itemName}</h3>
                        <h4 className="product-price text-start" ><strong>Price : </strong> {item.currency ? item.currency.split('-')[0] : null}{item.price}</h4>
                    </div>
                </div>
            </div>
        ))
    }
    return (
        <div>
            <NavBar />
            <section className="section-products" style={{ "marginBottom": "100px" }}>
                <div className="container">
                    <div className="row">
                        {itemrows}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default DashBoard;