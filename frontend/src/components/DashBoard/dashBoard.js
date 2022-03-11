import React, { Component } from "react";
//import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
//import { Navigate } from 'react-router';
import NavBar from "../Navbar/navbar";


class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectVar: null
        }
        //   this.handleLogout = this.handleLogout.bind(this)
        //this.handleOrders = this.handleOrders.bind(this)
        //  this.handlePastOrders = this.handlePastOrders.bind(this)
    }



    render() {
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to="/login"/>
        // }
        // let ownerLogin;

        //let navLogin = null;
       
        return (
           <NavBar/>
        );
    }
}

export default DashBoard;