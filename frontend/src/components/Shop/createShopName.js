import React, { Component } from "react";
// import {Link} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import './shop.css';
///import rootUrl from "../config/settings";
//import swal from "sweetalert"
import NavBar from '../Navbar/navbar'

const CreateShopNameSchema = Yup.object().shape({
    shopName: Yup.string()
        .required("userName is required")
        .min(4,"Shop names must have 4–20 characters")
        .max(20,"Shop names must have 4–20 characters"),
    
});

export default class CreateShopName extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopName: "aa",
            isUpdated: false,
            isAvailiable: false
        }
        this.enableNextButton = this.enableNextButton.bind(this)
    }


    async componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username"),
            userID: localStorage.getItem("userId")
        }
        console.log("Inside create shop name after component did mount");

        // axios.post('http://localhost:3000/getShopName', data)
        //     .then(response => {
        //         console.log("Status Code : ", response.status);
        //         if (response.status === 200) {
        //             this.setState({
        //                 email: response.data.email,
        //                 username: data.username,
        //                 phone: response.data.phone,
        //                 address: response.data.address,



        //                 //isLoade: true
        //             })
        //         }
        //         else {
        //             this.setState({
        //                 //    isCreated: false
        //             })
        //             alert("Book Id exists")
        //         }
        //     });

        console.log("state updated", this.state)

    }
    
    checkAvaliability = async (details) => {
        console.log("Inside check Avaliability submit", details);
        const data = {
            shopName: details.shopName,
        }
        await axios.post('http://localhost:3000/api/getShopName', data)
        .then(response => {
            console.log("Status Code : ", response.status);
            if (response.status === 200) {
                this.setState({
                    isAvailiable: true
                })

                this.enableNextButton()
            }
           // else if(response.status === 404){
               else{
                this.setState({
                    isAvailiable: false
                })
            }
            this.setState({
                isUpdated: true
            })
            console.log("updated Code : ", this.state.isUpdated);
        });
    }

    enableNextButton() {
        console.log("Inside next enable Button");
        document.getElementById('nextButton').style.visibility = "visible";
    }


    render() {
         
        return (
            <div>
                <NavBar />
                <div className="container-xl px-4 mt-4">
                    <Formik
                        initialValues={{
                            shopName: "",
                        }
                        }
                        validationSchema={CreateShopNameSchema}
                        onSubmit={(values, actions) => {
                            this.checkAvaliability(values)
                            console.log({ values, actions });
                            // alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        {({ touched, errors }) => (
                            <Form>
                                <div className="row">


                                    <div className="col-xl-12">
                                        <div className="card mb-4">
                                            <div className="card-header fw-bold">Name your shop</div>
                                            <div className="card-body">
                                                <div className="mb-3 row">
                                                    <div className="col-10">
                                                        <label className="small mb-1" htmlFor="shopName">Choose a memorable name that reflects your style</label>
                                                        <Field className={`form-control ${touched.shopName && errors.shopName ? "is-invalid" : ""}`} name="shopName" id="shopName" type="text" placeholder="Enter your Shop Name" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="shopName"
                                                            className="invalid-feedback"
                                                        />
                                                        {this.state.isUpdated && !this.state.isAvailiable?<div style={{color:'red'}}>Unfortunately, this ShopName is already taken, </div>:null}
                                                    </div>
                                                    <div className="col-2 shopButton">
                                                        <button type="submit" className="btn btn-dark mb-3">Check Availability</button>
                                                    </div>

                                                </div>
                                                <div className="mb-3 shopButton">
                                                <button className="btn btn-primary" id="nextButton" name='nextButton' style={{ visibility: 'hidden',float:'left' }} type="submit">Next</button>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        )
    }
}



