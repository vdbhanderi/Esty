import React, { Component } from "react";
// import {Link} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import './profile.css';
///import rootUrl from "../config/settings";
//import swal from "sweetalert"
import user_image from "../../images/user_defaultimage.png"
import NavBar from '../Navbar/navbar'

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
    password: Yup.string()
        .min(8, "Password must be 8 characters at minimum")
        .required("Password is required"),
    phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required("Phone number is required"),
    address: Yup.string()
        .required("Address is required"),
    zip: Yup.string()
        .matches(zipRegEx, "Zip code is not valid")
        .required("ZIP code is required"),
 country: Yup.string()
        .required("country is required"),

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
            profileImage: "",
            profileImagePreview: undefined,
            isUpdated: false
            // restName: "xyz",
            // restAdr:"Sample Resto Address",
            // restZip: "55555",
            // restPhone: "9999999999",
        }
        this.editProfile = this.editProfile.bind(this)
        this.savechanges = this.savechanges.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }


    async componentDidMount() {
        let data = {
            useremail: localStorage.getItem("userEmail"),
            username: localStorage.getItem("username")

        }
        console.log("Inside get profile after component did mount");

        axios.post('http://localhost:3000/getProfile', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        email: response.data.email,
                        username: data.username,
                        phone: response.data.phone,
                        address: response.data.address,
                        zip: response.data.zip,
                        state: response.data.state,
                        dob: response.data.dob,
                        profileImage: response.data.profileImage,
                        country: response.data.country,
                        gender: response.data.gender,
                        city: response.data.city,
                        

                        //isLoade: true
                    })
                }
                else {
                    this.setState({
                        //    isCreated: false
                    })
                    alert("Book Id exists")
                }
            });
        // await this.props.getProfile(data)
        // this.setState({
        //     email: this.props.profileStateStore.result.userEmail,
        //     username: this.props.profileStateStore.result.userName,
        //     phone: this.props.profileStateStore.result.userPhone,
        //     address: this.props.profileStateStore.result.userAdr,
        //     zip: this.props.profileStateStore.result.userZip,
        //     profileImage: this.props.profileStateStore.result.profileImage
        // });
        console.log("state updated", this.state)
        console.log("Profile image name", this.profileImage);

    }

    //handle change of profile image
    handleChange = (e) => {
        const target = e.target;
        const name = target.name;

        if (name === "ProfileImage") {
            console.log(target.files);
            var profilePhoto = target.files[0];
            var data = new FormData();
            data.append('photos', profilePhoto);
            axios.defaults.withCredentials = true;
            axios.post("rootUrl" + '/upload-file', data)
                .then(response => {
                    if (response.status === 200) {
                        console.log('Profile Photo Name: ', profilePhoto.name);
                        if (profilePhoto.name) {
                            this.setState({
                                profileImage: profilePhoto.name,
                                profileImagePreview: "rootUrl" + "/download-file/" + profilePhoto.name
                            })
                        }

                    }
                });
        }
    }

    editProfile() {
        var frm = document.getElementById('profile-form');
        for (var i = 0; i < frm.length; i++) {
            frm.elements[i].disabled = false;
            // console.log(frm.elements[i])
        }
        // document.getElementById('userName').disabled = false;
        document.getElementById('userName').focus()
        // document.getElementById('password').style.display="block";
        // document.getElementById('btn-edit-profile').style.display="none";
        document.getElementById('btn-submit-profile').style.visibility = "visible";
        document.getElementById('btn-cancel-profile').style.visibility = "visible";
        document.getElementById('btn-edit').style.visibility = "hidden";
        document.getElementById('profileImage').style.visibility = "visible";

    }


    submitProfile = async (details) => {
        console.log("Inside profile update", details);
        const data = {
            email: details.email,
            // userPassword : details.password,
            username: details.username,
            phone: details.phone,
            address: details.address,
            zip: details.zip,
            userImage: this.state.profileImage
        }
        await this.props.updateProfile(data);
        this.savechanges();
    }

    savechanges(values) {
        console.log("Inside profile update", values);
        var frm = document.getElementById('profile-form');
        for (var i = 0; i < frm.length; i++) {
            console.log(frm.elements[i])
            frm.elements[i].disabled = true;
        }
        // document.getElementById('userName').focus()
        document.getElementById('password').style.display = "none";
        // document.getElementById('btn-edit-profile').style.display="none";
        document.getElementById('btn-submit-profile').style.visibility = "hidden";
        document.getElementById('btn-cancel-profile').style.visibility = "hidden";
        document.getElementById('btn-edit').style.visibility = "visible";
        document.getElementById('profileImage').style.visibility = "hidden";

    }


    render() {

        console.log("profile image preview", this.state.profileImagePreview)
        let profileImageData = <img src={user_image} alt="logo" />
        if (this.state.profileImagePreview) {
            profileImageData = <img src={this.state.profileImagePreview} alt="logo" />
        }
        return (
            <div>
                <NavBar />
                <div className="container-xl px-4 mt-4">
                    <Formik
                        initialValues={{
                            username: "",
                            phone: "",
                            fullname: '',
                            state: "",
                            address: "",
                            email: '',
                            gender: '',
                            country: "",
                            zip: "",
                            city: "",
                            dob:"",
                            profileImage: "",
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
                                                <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                                <button className="btn btn-primary" type="button">Upload new image</button>
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
                                                    <fieldset className="form-group mb-3">
                                                        <div className="row">
                                                            <legend className="col-form-label pt-0 small mb-2">Gender</legend>
                                                            <div className="col-sm-3 radio mx-auto">
                                                                <div className="form-check form-check-inline">
                                                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio1" />
                                                                    <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                                                                </div>

                                                                <div className="form-check form-check-inline">
                                                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2" />
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
                                                            <label className="small mb-1" htmlFor="country" name='country'>Country</label>
                                                            <select id="country" className="form-control">
                                                                <option defaultValue={''}>Choose...</option>
                                                                <option>...</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label className="small mb-1" htmlFor="inputZip">Zip</label>
                                                            <Field type="number" className={`form-control ${touched.zip && errors.zip ? "is-invalid" : ""}`} id="zip" placeholder='zip'/>
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



