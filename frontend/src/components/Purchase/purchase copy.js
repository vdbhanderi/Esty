import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from 'axios';
import { Navigate } from 'react-router';
import backendUrl from '../config';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { getOrderedItems } from "../../redux/Actions/items";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navbar/navbar";
import Footer from "../Footer/footer";

export default function Purchase() {
    // var items = [];
    //const dispatch = useDispatch()
    const [items, setData] = useState([]);
    //var fetchItems=useSelector((state) => state.orderedItems);


    var data = {
        userId: localStorage.getItem("userId")
    }
    //   useEffect(() => {
    //     dispatch(getOrderedItems(data))
    //     setData(fetchItems);
    // }, [dispatch])
    useEffect(() => {
        axios.post(`${backendUrl}/api/getOrderedItems`, data).then((response) => {
            setData(response.data);
            console.log(response.data)
        });
    }, []);
    function abc() {

        if (items !== null) {
            console.log(items[0])
            var nItems = []
            for (let i = 0; i < items.length; i++) {
                nItems.push({ itemName: items[i]['itemName'], itemImage: <img src={items[i]['itemImage']} alt="" width="70" className="img-fluid rounded shadow-sm" />, shopName: items[i]['shopName'], quantity: items[i]['quantity'], itemPurchaseDate: items[i]['itemPurchaseDate'], price: items[i]['price'], giftDesc: items[i]['giftDesc'] });
            }
            return nItems
        }

    }
    const columns = [
        {
            dataField: "itemName",
            text: "Product Name",
        },
        {
            dataField: "itemImage",
            text: "Product Image",
        },
        {
            dataField: "shopName",
            text: "Shop Name",
        },
        {
            dataField: "quantity",
            text: "Quantity"
        },
        {
            dataField: "itemPurchaseDate",
            text: "Date of Purchase"
        },
        {
            dataField: "price",
            text: "price"
        }, {
            dataField: "giftDesc",
            text: "Gift Description"
        }
    ];
    const options = {
        sizePerPageList: [{
            text: '2', value: 2
        },
        {
            text: '5', value: 5
        },
         {
            text: '10', value: 10
        }],
        sizePerPage: 5,
        pageStartIndex: 0,
        paginationSize: 3,
    };

    return (

        <div>
            <NavBar />
            <section className="py-5">
                <div className="container px-4 px-lg-5 ">
                    <div className="row">
                        <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                            <p className="h2 fw-bold  p-3">My Purchases</p>
                            <div className="table-responsive purchaseTable">
                                {items !== null ?
                                    <BootstrapTable
                                 bootstrap4
                                keyField="id"
                                data={abc()}
                                columns={columns}
                                pagination={paginationFactory(options)}
                                    />
                                :
                                <h4>No Purchase Found</h4>
                                }
                            </div>

                        </div>

                    </div>


                </div>
            </section>


            <Footer />
        </div>
    )



}


