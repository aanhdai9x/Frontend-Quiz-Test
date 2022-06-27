import { Outlet, Navigate } from "react-router-dom";
import React from 'react';

const PrivateRoute = () => {
    let token = localStorage.getItem('token');
    if (token === undefined || token === '' || token === null) {
        token = false;
    } else {
        token =  true;
    }
    let auth = { 'token': token }
    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute;