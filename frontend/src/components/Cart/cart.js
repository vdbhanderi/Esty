import React, { useEffect, useState } from 'react';
import NavBar from '../Navbar/navbar';
import './cart.css';
import { Navigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery'
import { checkOut } from '../../redux/Actions/cart';
import axios from 'axios';
import backendUrl from "../config";
import { removeFromCart,updateQunatity } from '../../redux/Actions/cart'

function Cart() {
    var cart = useSelector((state) => state.cart);
    var isOrdered = useSelector((state) => state.isOrdered);
    const dispatch=useDispatch();
    var items = cart.items;
    const[updated,setUpdated]=useState(false);
    var itemrows;
    var totalprice = 0;
     useEffect(() => 
     {
         console.log("inside userId")
         let data = {
             userId: localStorage.getItem("userId")
         }
          axios.post(`${backendUrl}/api/getCart`, data)
         .then((response) => {
             if(response){
                items=response.data.items;
             }
         });
     }, [ updated])
    const descChangeHandler = (desc, itemId) => {
        items = items.map(x => x.itemId === itemId ? { ...x, giftDesc: desc } : x)
    }
    const showHideTextbox = (e, itemId) => {
        if (e.target.checked) {
            $("#textarea_" + itemId).show();
        }
        else {
            $("#textarea_" + itemId).hide();
        }
    }
    const removeItemFromCart = (e) => {
        console.log(e)
        let data = {
            itemId: e,
            userId: localStorage.getItem("userId")
        }
        dispatch(removeFromCart(data))
        setUpdated(true);
        //useitemId(e.target.id)
       // alert("removeItemFromCart")
    }

    const incrementItem = (e,itemId,quantity) => {
        console.log(quantity)
        quantity+=1;
        let data = {
            itemId: itemId,
            quantity: quantity,
            userId: localStorage.getItem("userId")
        }
        dispatch(updateQunatity(data))
        e.target.value=quantity
        setUpdated(true);
    }
    const decrementItem = (itemId,quantity) => {
        console.log("sss",itemId)
        quantity-=1
        if(quantity===0){
            alert("quantity 0 is not allowed")
        }
        else{
            let data = {
                itemId: itemId,
                quantity:quantity ,
                userId: localStorage.getItem("userId")
            }
            dispatch(updateQunatity(data))
            setUpdated(true);
        }
       
    }
    
    const CheckOut = () => {
        var data = {
            userId: localStorage.getItem("userId"),
            cartId: localStorage.getItem("cartId"),
            items: items
        }
        localStorage.removeItem("cartId")
        dispatch(checkOut(data))

    }
    if (items) {
        itemrows = items.map(item => {
            return (
                <tr>
                    {/* <th scope="row" className="border-0">
                        <div className="p-2">
                            {/* <img src={item.itemimage} alt="" width="70" className="img-fluid rounded shadow-sm" /> }
                            <div className="ms-3 d-inline-block align-middle">
                                <h5 className="mb-0"> <a href="#s" className="text-dark d-inline-block align-middle">{item.itemName}</a></h5>
                            </div>
                        </div>
                    </th>  */}
                    <td className="align-middle"><strong>{item.itemName}</strong></td>
                    <td className="align-middle"><strong>{localStorage.getItem("currency") }{item.price}</strong></td>
                    <td className=" align-middle"><strong>
                    {/* <input className="form-check-input" type="number" value={item.quantity} id="" onChange={e => updateQua(e, item.itemId)} style={{width:"30px",height:"30px"}} /> */}
                    <button onClick={(e)=>incrementItem(e,item.itemId,item.quantity)}><i className="bi bi-plus"/></button> {item.quantity} <button onClick={()=>decrementItem(item.itemId,item.quantity)}><i className="bi bi-dash"/></button>
                        </strong></td>
                    <td className="align-middle"><a href="#removeCart" className="text-dark"><i className="bi bi-trash" id={item.itemId} onClick={e => removeItemFromCart(item.itemId)}></i></a></td>
                    <td className=""><strong><div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={e => showHideTextbox(e, item.itemId)} style={{ "float": "none" }} />
                        <textarea className="form-control" id={"textarea_" + item.itemId} rows="3" onKeyUp={e => descChangeHandler(e.target.value, item.itemId)} style={{ "display": "none", "float": "right" }} required></textarea>
                    </div></strong></td>

                </tr>

            )
        })
        items.forEach(element => {
            totalprice += (element.quantity * element.price)
        });
    }
   
    var redirectVar = null
     if (isOrdered) {
         redirectVar = <Navigate to="/purchase" />
     }
    return (
        <div className="">
            {redirectVar}
            <NavBar />
            <div className="cart">

                <section className="py-5">
                    <div className="container px-4 px-lg-5 ">
                        <div className="row">
                            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Price</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Quantity</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light ">
                                                    <div className="py-2 text-uppercase">Remove</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light ">
                                                    <div className="py-2 text-uppercase">Gift packing option</div>
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
                        <div className="row">
                            <div className="col-lg-6 p-5 bg-white rounded shadow-sm mb-5">
                                <div className="bg-light rounded-pill px-4 py-3 text-uppercase fw-bold">Order summary </div>
                                <div className="p-4">
                                    <p className="mb-4"><em>Shipping and additional costs are calculated based on values you have entered.</em></p>
                                    <ul className="list-unstyled mb-4">
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order Subtotal </strong><strong>{localStorage.getItem("currency") }{totalprice}</strong></li>
                                        {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and handling</strong><strong>$10</strong></li> */}
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Tax</strong><strong>{localStorage.getItem("currency") }0</strong></li>
                                        <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                                            <h5 className="fw-bold">{localStorage.getItem("currency") }{parseFloat(totalprice).toFixed(2)}</h5>
                                        </li>
                                    </ul><a href="#checkOut" className="btn btn-dark rounded-pill py-2 d-md-block text-light" onClick={CheckOut}>Procceed to checkout</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </div>

    )

}
export default Cart;