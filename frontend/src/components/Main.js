//import {route} from 'react'
import { Component } from 'react';
import { Route,Routes } from 'react-router-dom';
import DashBoard from './DashBoard/dashBoard';
import Profile from '../components/Profile/profile';
import Product from '../components/Product/product';
import Cart from '../components/Cart/cart';
import Purchase from '../components/Purchase/purchase';
import Favourite from './Favourite/favourite';

class MainRoutes extends Component {
    render() {
        return (
            <div>

                <Routes>
                    <Route path="/" element={<DashBoard/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route exact path="/product/:id" element={<Product/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/purchase" element={<Purchase/>} />
                    <Route path="/dashboard" element={<DashBoard/>} />
                    <Route path="/favourite" element={<Favourite/>} />

                </Routes>

            </div>  
        )
    }
}
export default MainRoutes