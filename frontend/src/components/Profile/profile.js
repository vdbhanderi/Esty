import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import './profile.css';
///import rootUrl from "../config/settings";
//import user_image from "../../images/user_defaultimage.png"
import NavBar from '../Navbar/navbar'
import backendUrl from "../config";

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
const zipRegEx = /^[0-9]{5}(?:-[0-9]{4})?$/

const UpdateProfileSchema = Yup.object().shape({
    username: Yup.string()
        .required("userName is required"),
     fullname: Yup.string()
         .required("fullname is required"),
     email: Yup.string()
         .email("Invalid email address format")
         .required("Email is required"),
     phone: Yup.string()
         .matches(phoneRegExp, 'Phone number is not valid')
         .required("Phone number is required"),
     address: Yup.string()
         .required("Address is required"),
     zip: Yup.string()
         .matches(zipRegEx, "Zip code is not valid")
         .required("ZIP code is required"),
    //  country: Yup.string()
    //      .required("country is required"),

});

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            phone: "",
            fullname: '',
            state: "",
            address: "",
            email: '',
            gender: '',
            country: "",
            zip: "",
            dob:"",
            city: "",
            userImage: "",
            profileImagePreview: undefined,
            isUpdated: false
           
        }
        this.submitProfile = this.submitProfile.bind(this)
      //  this.handleChange = this.handleChange.bind(this);
    }


    async componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username"),
            userId: localStorage.getItem("userId"),

        }
        console.log(localStorage.getItem('userId'))
        console.log("Inside get profile after component did mount");

        await axios.post(`${backendUrl}/api/getProfile`, data)
        .then(response => {
            console.log("Status Code : ", response.status);
            console.log("Status Code : ", response.data);
            if (response.status === 200) {
                this.setState({
                    fullname: response.data.fullname,//response.data.address,    
                    email: response.data.email,//response.data.address,    
                    zip: response.data.zip, 
                    state: response.data.state, 
                    gender: response.data.gender, 
                    country: response.data.country, 
                    address: response.data.address, 
                    dob: response.data.dob, 
                    phone: response.data.phone, 
                    city: response.data.city, 
                    username: response.data.username, 
                    userImage: response.data.userImage, 
                })
            }
            else {
                this.setState({
                })
            }
        });
        console.log("state updated", this.state)
        //console.log("Profile image name", this.profileImage);

    }

   
    uploadImage = async (e) => {
        const target = e.target;
        const name = target.name;
        console.log(name)

        if (name === "userImage") {
            var profilePhoto = target.files[0];
            console.log('2', profilePhoto);

            const data = new FormData();
            data.append('file', profilePhoto);
            console.log(data.get("file"))
            await axios.post(`${backendUrl}/uploadImage`, data)
                .then(response => {
                    if (response.status === 200) {
                        console.log("success")
                        console.log("response",response.data)
                        var userImage=response.data.itemImage.replace(/["]+/g, '')
                        console.log('Profile Photo Name: ', userImage);
                        this.setState({
                            userImage: `${backendUrl}/download-file/` + userImage,
                            // itemImage: 
                        })
                        console.log("image", this.state.userImage)
                    }
                });
        }
    }

    submitProfile = async (details) => {
        console.log("Inside profile update", details);
        const data = {
            email: details.email,
            firstName: details.fullname,
            userId: localStorage.getItem("userId"),
            username: details.username,
            phone: details.phone,
            address: details.address,
            zip: details.zip,
            gender: details.gender,
            country: "USA",//details.country,
            state: details.state,
            userImage: details.userImage,
            city: details.city
        }
         axios.post(`${backendUrl}/api/submitProfile`, data)
         .then(response => {
             console.log("Status Code : ", response.status);
             if (response.status === 200) {
                   alert("successfully Updated")
                   this.setState({
                       dop:'11/11/2011'
                })
             }
             else {
              
             }
         });
    }


    render() {

        // console.log("profile image preview", this.state.profileImagePreview)
        // let profileImageData = <img src={user_image} alt="logo" />
        // if (this.state.profileImagePreview) {
        //     profileImageData = <img src={this.state.profileImagePreview} alt="logo" />
        // }
        return (
            <div>
                <NavBar />
                <div className="container-xl px-4 mt-4">
                    <Formik
                    enableReinitialize
                        initialValues={{
                            username: this.state.username,
                            phone: this.state.phone,
                            fullname: this.state.fullname,
                            state: this.state.state,
                            address:this.state.address,
                            email: this.state.email,
                            gender: this.state.gender,
                            country: this.state.country,
                            zip: this.state.zip,
                            city: this.state.city,
                            dob:this.state.dob,
                            userImage: this.state.userImage,
                        }
                        }
                      
                        validationSchema={UpdateProfileSchema}
                        onSubmit={(values, actions) => {
                            this.submitProfile(values)
                            console.log({ values, actions });
                            // alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        {({ touched, errors }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="card mb-4 mb-xl-0">
                                            <div className="card-header">Profile Picture</div>
                                            <div className="card-body text-center">
                                                <img className="img-account-profile rounded-circle mb-2" src={this.state.userImage} alt="" />
                                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                                <input type='file' name='userImage' onChange={this.uploadImage} />
                                                {/* <button className="btn btn-primary" type="button" onClick={this.uploadImage}>Upload new image</button> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-8">
                                        <div className="card mb-4">
                                            <div className="card-header">My Profile</div>
                                            <div className="card-body">
                                                    <div className="mb-3">
                                                        <label className="small mb-1" htmlFor="username">Username (how your name will appear to other users on the site)</label>
                                                        <Field className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`} name="username" id="username" type="text" placeholder="Enter your username" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="username"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="small mb-1" htmlFor="fullname">Full Name</label>
                                                        <Field className={`form-control ${touched.fullname && errors.fullname ? "is-invalid" : ""}`}id="fullname" name="fullname" type="text" placeholder="Full name" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="fullname"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <fieldset className="form-group mb-3" name="gender">
                                                        <div className="row">
                                                            <legend className="col-form-label pt-0 small mb-2">Gender</legend>
                                                            <div className="col-sm-3 radio mx-auto">
                                                                <div className="form-check form-check-inline">
                                                                    <Field className="form-check-input" type="radio" name="gender" id="male" value="male"/>
                                                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <Field className="form-check-input" type="radio" name="gender" id="female" value="female" />
                                                                    <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <div className="mb-3">
                                                        <label className="small mb-1" htmlFor="email">Email Address</label>
                                                        <Field className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}id="email" name="email" type="email" placeholder="Enter your email address" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="email"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="mb-3 form-group">
                                                        <label className="small mb-1" htmlFor="address">Address</label>
                                                        <Field className={`form-control ${touched.address && errors.address ? "is-invalid" : ""}`} id="address" name="address" type="text" placeholder="Enter address" />
                                                        <ErrorMessage
                                                            component="div"
                                                            name="address"
                                                            className="invalid-feedback"
                                                        />
                                                    </div>
                                                    <div className="row gx-3 mb-3 form-group">
                                                        <div className="form-group col-md-6">
                                                            <label className="small mb-1" htmlFor="city">City</label>
                                                            <Field type="text" className="form-control" id="city"name='city' placeholder='city' />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="small mb-1" htmlFor="state">State</label>
                                                            <Field type="text" className="form-control" id="state" name="state" placeholder='state'/>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="small mb-1" htmlFor="country">Country</label>
                                                            <select id="country"  name='country' className="form-control">
                                                                <option key='India' value="India">India</option>
                                                                <option defaultValue="USA" value="USA">USA</option>
                                                                <option key="Brazil" value="Brazil">Brazil</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="small mb-1" htmlFor="inputZip">Zip</label>
                                                            <Field type="text" className={`form-control ${touched.zip && errors.zip ? "is-invalid" : ""}`}   name="zip" id="zip" placeholder='zip'/>
                                                            <ErrorMessage   
                                                                component="div"
                                                                name="zip"
                                                                className="invalid-feedback"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row gx-3 mb-3">
                                                        <div className="col-md-6 form-group">
                                                            <label className="small mb-1" htmlFor="phone">Phone number</label>
                                                            <Field className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""}`} id="phone" name='phone' type="tel" placeholder="Enter your phone number" />
                                                            <ErrorMessage
                                                                component="div"
                                                                name="phone"
                                                                className="invalid-feedback"
                                                            />
                                                        </div>
                                                        <div className="col-md-6 form-group">
                                                            <label className="small mb-1" htmlFor="dob">Birthday</label>
                                                            <Field className="form-control" id="dob" type="text" name="dob" placeholder="Enter your birthday" />
                                                            <ErrorMessage
                                                                component="div"
                                                                name="dob"
                                                                className="invalid-feedback"
                                                            />
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary" type="submit">Save changes</button>
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



