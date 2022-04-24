//import {route} from 'react'
import { Component } from 'react';
import { Route,Routes } from 'react-router-dom';
import DashBoard from './DashBoard/dashBoard copy';
import Profile from '../components/Profile/profile';
import Product from '../components/Product/product1';
import Cart from '../components/Cart/cart';
import Purchase from '../components/Purchase/purchase copy';
import Purchase1 from '../components/Purchase/purchase';
import Favourite from './Favourite/favourite';
import  CreateShopName from './Shop/createShopName';
import  ShopHome from './Shop/shopHome';

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
                    <Route path="/purchase1" element={<Purchase1/>} />
                    <Route path="/dashboard" element={<DashBoard/>} />
                    <Route path="/favourite" element={<Favourite/>} />
                    <Route path="/createShopName" element={<CreateShopName/>} />
                    <Route path="/shopHome/:id" element={<ShopHome/>} />

                </Routes>

            </div>  
        )
    }
}
export default MainRoutes