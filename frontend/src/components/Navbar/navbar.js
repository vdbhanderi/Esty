import React,{  }  from "react";
import { Link } from 'react-router-dom';
import {
    // Formik, FormikHelpers, FormikProps, Form, Field, FieldProps,
    Formik, Form, Field, ErrorMessage
} from 'formik';
import cookie from 'react-cookies';
import { Navigate } from 'react-router';
//import { useDispatch, useSelector,connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import './navbar.css'
import * as Yup from "yup";
import { userLogin } from "../../Actions/loginAction";
import { Axios } from "axios";
const LoginSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        loginEmail: Yup.string().email('Invalid email').required('Required'),
});
const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    regPassword: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    regEmail: Yup.string().email('Invalid email').required('Required'),
});
export default function NavBar() {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         email: '',
    //         regEmail: '',
    //         regPassword: '',
    //         password: '',
    //         name: '',
    //         authFlag: 'false',
    //         redirectVar: null
    //     }
    //     //   this.handleLogout = this.handleLogout.bind(this)
    //     this.submitLogin = this.submitLogin.bind(this)
    //     this.submitRegister = this.submitRegister.bind(this)
    // }
    
    // const onChange = (e) => {
    //     const { name, value } = e.target;
    //     setInputs((input) => ({ ...input, [name]: value }));
    //   };
    const handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })
        localStorage.removeItem('accountType')
        localStorage.removeItem('token')
        localStorage.clear();
    }
   const dispatch = useDispatch();
    const submitLogin = (details) => {
        console.log("Inside submit login", details);
        dispatch(userLogin(details));
       // this.props.userLogin(details);
        this.setState({
           // redirectVar: <Navigate to="/upcomingorders" />
        })
    }
   const submitRegister = (details) => {
        console.log("Inside submit login", details);
        this.setState({
            redirectVar: <Navigate to="/upcomingorders" />
        })
        Axios.post("http://localhost:3001/api/insert", {
            username: details.username,
            email: details.email,
            password: details.password,
          })
          .then((response) => {
            console.log("response status is " + response.status);
            if (response.status === 200) {
              //setuser({ ...user, redirect: "profile" });
              console.log("status is 200 redirect page");
              console.log("signup response api" + response.data);
              window.location.reload();
              cookie.save("auth", true, {
                path: "/",
                httpOnly: false,
                maxAge: 90000,
              });
              cookie.save("id", response.data.id, {
                path: "/",
                httpOnly: false,
                maxAge: 90000,
              });
              cookie.save("name", response.data.name, {
                path: "/",
                httpOnly: false,
                maxAge: 90000,
              });
              cookie.save("email", response.data.email, {
                path: "/",
                httpOnly: false,
                maxAge: 90000,
              });
              cookie.save("defaultcurrency", response.data.currency, {
                path: "/",
                httpOnly: false,
                maxAge: 90000,
              });
              cookie.save("timezone", "American/Los_Angeles", {
                path: "/",
                httpOnly: false,
                maxAge: 90000,
              });
            }
          })
          .catch(
             err=>{
             alert("Your email has already been registered !");
          })
        
    }
   // render() {
        let navLogin = null;
        if (localStorage.getItem('token')) {
            console.log("Able to read token");
            // if (localStorage.getItem('accountType') === "1") {
            //     console.log("near nav login")
            //     navLogin = (
            //         <ul className="nav navbar-inverse ">
            //             <li><Link to="/userhome">Home</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
            //                  <li className="dropdown active">
            //                 <a className="dropdown-toggle" href="/upcomingorders" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
            //                     Orders
            //                         </a>
            //                 <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            //                     <a className="dropdown-item" href="/" onClick={this.handleOrders}>Upcoming Orders</a>
            //                     <a className="dropdown-item" href='/' onClick={this.handlePastOrders}>Past Orders</a>
            //                 </div>
            //             </li>&nbsp;&nbsp;&nbsp;&nbsp;
            //                  <li><Link to="/cart">Cart</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
            //                  <li><Link to="/account">{localStorage.getItem("userName")}</Link></li>&nbsp;&nbsp;&nbsp;&nbsp;
            //                  <li><Link to="/" onClick={this.handleLogout}>Logout</Link></li>
            //         </ul>
            //     )
            // }
        }
        let authPanel = null
        if (cookie.load('auth')) {
            // redirectVar = <Navigate to="/login"/>
            authPanel = (
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="d-inline nav-item ">
                            <button className="btn btn-outline" type="submit" data-bs-toggle="tooltip" data-bs-placement="bottom" title="favourites"> <Link to='/favourite'><i className="bi bi-heart"></i></Link></button>
                        </li>
                        <li className="d-inline nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="navbarDropdown" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-person-circle"></i>
                            </a>
                            {/* <button className="btn btn-outline" type="submit"> <Link to='/favourite'><i className="bi bi-person-circle"></i></Link></button> */}
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/profile">My Profile</a></li>
                                <li><a className="dropdown-item" href="/product">My Purchase</a></li>
                                <li><a className="dropdown-item" href="/cart">Cart</a></li>

                                {/* <li><Link to='/profile'>My Purchase</Link></li> */}

                            </ul>
                        </li>
                        <li className="d-inline">
                            <button className="btn btn-outline" type="submit"> <Link to='/cart'><i className="bi bi-cart4"></i></Link></button>
                        </li>
                        <li className="d-inline">
                            <button className="btn" type="submit"> <Link to='/about'><i className="bi bi-box-arrow-in-right" onClick={handleLogout}></i></Link></button>
                        </li>
                    </ul>
                </div>
            )
        }
        else{
            authPanel=( 
                <div>
                      <div className="col-md-2 d-inline">
                        <button type="button" className="btn btn-outline-primary btnSpace" data-bs-toggle="modal" data-bs-target="#LoginModal">
                            Sign IN
                        </button>
                        <button type="button" className="btn btn-outline-dark btnSpace" data-bs-toggle="modal" data-bs-target="#RegisterModal">
                            Register
                        </button>
                    </div>
                    <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog rounded-pill">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel ">Sign in</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body">


                                    <Formik
                                        initialValues={{
                                            loginEmail: '',
                                            password: '',
                                          }}
                                        
                                        validationSchema={LoginSchema}
                                        onSubmit={(values, actions) => {
                                            submitLogin(values)
                                            console.log({ values, actions });
                                            // alert(JSON.stringify(values, null, 2));
                                        }}
                                    >
                                        {({ touched, errors }) => (
                                            <Form method="post"> 
                                                <div className="mb-3">
                                                    <label htmlFor="loginEmail" className="form-label emailLabel fw-bolder">Email address</label>
                                                    <Field type="email"  className={`form-control ${touched.loginEmail && errors.loginEmail ? "is-invalid" : ""}`} id="loginEmail" name='loginEmail' placeholder="name@example.com" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="password"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label emailLabel fw-bolder">Password</label>
                                                    <Field type="password" className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`} id="password" name='password' placeholder="" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="password"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <button type="submit" className="btn btn-dark loginButton rounded-pill">Sign in</button>
                                                {/* <p className="mt-5 mb-3 text-muted text-center">© 2017-2018</p> */}

                                            </Form>
                                        )}
                                    </Formik>

                                </div>
                                <div className="modal-footer">
                                    <h5 className="modal-title " id="modalFooter">Welcome To Esty!!!</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="RegisterModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <h6 className="fw-lighter">Registration is easy.</h6>
                                    <Formik
                                    initialValues={{
                                        regEmail: '',
                                        regPassword: '',
                                        name:''
                                      }}
                                      //  initialValues={this.state}
                                        validationSchema={RegisterSchema}
                                        onSubmit={(values, actions) => {
                                         submitRegister(values)
                                            console.log({ values, actions });
                                            // alert(JSON.stringify(values, null, 2));
                                        }}
                                    >
                                        {({ touched, errors }) => (
                                            <Form>
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label emailLabel fw-bolder">Full Name</label>
                                                    <Field type="text" className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`} id="name" name='name' placeholder="James Bond" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="name"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="regEmail" className="form-label emailLabel fw-bolder">Email address</label>
                                                    <Field type="email" className={`form-control ${touched.regEmail && errors.regEmail ? "is-invalid" : ""}`} id="regEmail" name='regEmail' placeholder="name@example.com" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="regEmail"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="regPassword" className="form-label emailLabel fw-bolder">Password</label>
                                                    <Field type="password" className={`form-control ${touched.regPassword && errors.regPassword ? "is-invalid" : ""}`} id="regPassword" name='regPassword' placeholder="" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="regPassword"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                <button type="submit" className="btn btn-dark loginButton rounded-pill">Create Account</button>
                                            </Form>
                                        )}
                                    </Formik>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            )
        }
        return (

            <header id="header">
                {/* {this.state.redirectVar} */}
                <nav className="navbar shadow-sm bg-white rounded navbar-dark bg-white text-left navbar-expand-lg">
                    <a className="navbar-brand ms5" href="/">
                        <h1 className="font-weight-bold" >&nbsp; Esty</h1>
                    </a>
                    <form className="d-inline-flex col-md-8 p-2">
                        <input className="form-control me-2 rounded" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit"> <i className="bi bi-search"></i></button>
                    </form>
                    {authPanel}
                  
                    {navLogin}
                </nav>
            </header>
        );
   // }
}
// const mapStateToProps = (state) => ({
    
//     loginStateStore: state.login
// })
// const mapDispatchToProps=(dispatch)=>{
//     return {
//         submitLogin: (details) => dispatch(userLogin(details))
//     };
    
//   }
//connect(mapStateToProps, mapDispatchToProps)(NavBar)
//export default NavBar;