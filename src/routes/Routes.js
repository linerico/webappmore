import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

import Login from "../pages/Login";
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/forgotPassword';
import Verification from '../pages/Verification';
import Mesin from '../pages/Mesin';
import ProfilePage from '../pages/profile';
import Notification from '../pages/Notification';
import Monitoring from '../pages/Monitoring';
import TambahPabrik from '../pages/TambahPabrik';
import UbahPabrik from '../pages/UbahPabrik';
import TambahMesin from '../pages/TambahMesin';
import UbahMesin from '../pages/UbahMesin';

const Routes = () => {
    return(
        <React.Fragment>
            <Route exact path={'/'} component = {Login}/>
            <Route exact path={'/forgotpassword'} component={ForgotPassword}/>
            <Route exact path={'/signUp'} component={SignUp}/>
            <Route exact path={'/verification'} component={Verification}/>

            <PrivateRoute exact path={'/pabrik'} component={Home}/>
            <PrivateRoute exact path={'/pabrik/:homeId'} component = {(props) => <Mesin {...props} />}/>
            <PrivateRoute exact path={'/profile'} component={ProfilePage}/>
            <PrivateRoute exact path={'/notifikasi'} component={Notification}/>
            <PrivateRoute exact path={'/pabrik/:homeId/mesin/:mesinId'} component={(props) => <Monitoring {...props} />}/>
            <PrivateRoute exact path={'/tambah-pabrik'} component={TambahPabrik}/>
            <PrivateRoute exact path={'/ubah-pabrik'} component={UbahPabrik}/>
            <PrivateRoute exact path={'/tambah-mesin'} component={TambahMesin}/>
            <PrivateRoute exact path={'/ubah-mesin'} component={UbahMesin}/>


        </React.Fragment>
    )
}

export default Routes