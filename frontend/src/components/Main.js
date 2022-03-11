//import {route} from 'react'
import { Component } from 'react';
import { Route,Routes } from 'react-router-dom';
import DashBoard from './DashBoard/dashBoard';
import Profile from '../components/Profile/profile';

class MainRoutes extends Component {
    render() {
        return (
            <div>

                <Routes>
                    <Route path="/" element={<DashBoard/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Routes>

            </div>  
        )
    }
}
export default MainRoutes