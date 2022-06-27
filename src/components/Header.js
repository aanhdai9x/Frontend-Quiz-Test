import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from './../Constant/Constant';

class Header extends Component {
    isLoggedIn = () => {
        let token = localStorage.getItem('token');
        if (token === undefined || token === '' || token === null) {
            return false;
        } else {
            return true;
        }
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }
    getUserRole = () => {
        var user = localStorage.getItem('user');
        var role = JSON.parse(user).authorities[0].authority;
        switch (role) {
            case "ADMIN":
                window.location.href = '/admin';
                break;
            case "NORMAL":
                window.location.href = '/user';
                break;
            default:
                break;
        }
    }

    render() {
        return (
            localStorage.getItem('token') == null ?
                <nav className="navbar navbar-inverse" style={{ margin: 'auto' }}>
                    <div className="container-fluid" style={{ backgroundColor: COLORS.primary_orange, }}>


                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <Link className="navbar-brand" to="/">Welcome Shopee</Link>
                        </div>
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">

                        </div>

                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                :
                <nav className="navbar navbar-inverse" style={{ margin: 'auto' }}>
                    <div className="container-fluid" style={{ backgroundColor: COLORS.primary_orange, }}>


                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <Link className="navbar-brand" to="/">Welcome Shopee</Link>
                            {/* <Link className="navbar-brand" onClick={this.getUserRole}>Home</Link> */}
                            <button className="navbar-brand" style={{background: 'none', border: 'none', marginLeft: 20}} onClick={this.getUserRole}>Home</button>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                        </div>

                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <ul className="nav navbar-nav">
                                <li>
                                    <Link to="/admin/profile">{JSON.parse(localStorage.getItem('user')).username}</Link>
                                </li>
                                <li onClick={this.logout}>
                                    <Link to="/" >Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        );
    }
}

export default Header;