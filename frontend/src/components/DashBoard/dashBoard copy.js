import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import Footer from "../Footer/footer";
import NavBar from "../Navbar/navbar";
import './dashboard.css'
import { Link } from "react-router-dom";
import { AddFavouriteIds, GetItems, RemoveFavouriteIds } from '../../redux/Actions/dashboardAction'
import backendUrl from "../config";

function DashBoard() {
    const [currency, setCurrency] = useState('');
 const currencyUpdate=(value)=>{
   localStorage.setItem("currency",value)
   setCurrency(value)
}

    var items = useSelector((state) => state.items)
    var isLoggedIn = useSelector((state) => state.isLoggedIn)
    var favIds = useSelector((state) => state.favIds)
    //const[favIds,setFavIds]=useState([])
    const dispatch = useDispatch();
    const [isFavUpdated,setFavUpdated]=useState(false)
    useEffect(() => 
    {
        console.log("inside userId")
        let data = {
            userId: localStorage.getItem("userId")
        }
         axios.post(`${backendUrl}/api/getProfile`, data)
        .then((response) => {
            if(response.data.favouriteIds){
                //setFavIds(response.data.favouriteIds);
                favIds=response.data.favouriteIds
                console.log(favIds)
            }
        });
    }, [ isFavUpdated])
    useEffect(() => {
        if(!items){
            dispatch(GetItems())
        }
    }, [dispatch, isLoggedIn, items,currency])
   

    const HandleFavourite = (e) => {
        console.log("inside favourite");
        var itemId = e.target.id
        console.log("itemId", itemId)
        let data = {
            itemId: itemId,
            userId: localStorage.getItem("userId")
        }
        //var favId = items.filter(x => x.itemId === parseInt(itemId))[0].favouriteId
       // console.log("fav", favId)
        if (favIds && favIds.includes(itemId)) {
            console.log("inside remove fav")

            dispatch(RemoveFavouriteIds(data))
            setFavUpdated(true)
        }
        else {
            console.log("inside add fav")
            dispatch(AddFavouriteIds(data))
            setFavUpdated(true)
        }
        //window.location.reload()

    }
    if(items){
        console.log("favIDSsss",favIds)
        items.forEach(function (element) {
            if(favIds){
                if(favIds.includes(element._id)){
                    element.favouriteId=true
                }
                else{
                    element.favouriteId=false
                }
            }
          });
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
                        {item.favouriteId  ? <span className="new heart" id={item._id} onClick={HandleFavourite} >&#9829;</span> :
                            <span className="new heart1" id={item._id} onClick={HandleFavourite} >&#9825;</span>}
                    </div>
                    <div className="part-2" >
                        <h3 className="product-title text-start"><strong>Item Name: </strong>{item.itemName}</h3>
                        <h4 className="product-price text-start" ><strong>Price : </strong> {currency?currency:'$'} {item.price}</h4>
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
            <Footer onChange={currencyUpdate} />
        </div>
    )
}

export default DashBoard;