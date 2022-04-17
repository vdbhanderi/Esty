import React, { useEffect, useState } from "react";
import axios from 'axios';
import './product.css';
import NavBar from '../Navbar/navbar'
import $ from 'jquery'
import { Navigate } from "react-router";
import backendUrl from "../config";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../redux/Actions/cart";

export default function Product() {
    var dispatch = useDispatch();
    var isCartAdded = useSelector((state) => state.isCartAdded)

    var { id } = useParams();
    console.log(id)
    const [item, setItem] = useState([]);
    useEffect(() => {
        const data = { itemId: id }
        axios.post(`${backendUrl}/api/getItem`, data)
            .then(response => {
                setItem(response.data[0])
            });
    }, [id]);


    const AddToCart = async () => {
        console.log(item.price)
        const quantity = $('#quantity').val();
        console.log(quantity)

        const cartId = localStorage.getItem("cartId");
        console.log('cartId', cartId)
        const userId = localStorage.getItem("userId");
        let data = {
            item: {
                itemId: item._id,
                itemName: item.itemName,
                itemImage: item.itemImage,
                shopName: item.shopName,
                price: item.price,
                quantity: quantity,
            },
            userId: userId,
            cartId: cartId,
        }
        dispatch(addToCart(data))
    }
    var redirectVar = null;
    if (isCartAdded) {
        redirectVar = <Navigate to="/cart" />;
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
                                <img src={item.itemImage} className="figure-img img-fluid rounded customImg" style={{ width: '647px', height: '647px' }} alt="..." />
                                <button className="btn"><i className="bi bi-heart"></i></button>
                            </div>
                            <div className="col-md-6">
                                <div className="card-body text-start">
                                    <h4 className="card-title fw-bolder">Product : {item.itemName}</h4>
                                    <div className="border-bottom">

                                        <h6 className="card-subtitle mb-2 text-muted   d-inline">Shop :  <Link to={`/shopHome/${item.shopName}`}>{item.shopName}</Link></h6>  <h6 className="card-subtitle mb-2 text-muted   d-inline" >|  Total Sales : {item.totalSale}</h6> <h6 className="card-subtitle mb-2 text-muted   d-inline" >| Avaiable Qunatity : {item.quantity}</h6>
                                    </div>
                                    <p className="card-text"><strong>Description : </strong> {item.description}</p>
                                    <p className="card-text"></p>
                                    <h6 className="card-subtitle mb-2 d-inline">Price: </h6><h6 className="card-subtitle mb-2 d-inline"> $</h6> <h6 className="card-subtitle mb-2 d-inline">{item.price}</h6>
                                    <div className="mb-3 col-md-3">
                                        <label htmlFor="quantity" className="form-label">Quantity:</label>
                                        <input type="number" className="form-control" id="quantity" min="1" placeholder="Qunatity" name='quantity' />
                                    </div>
                                    <div className="d-grid col-md-6 d-inline">
                                        <button type="button" className="btn btn-outline-primary rounded" onClick={AddToCart}>
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



