import React, { Component} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {BACKGROUNDS} from '../../Constant/Constant';
import { BASE_URL } from '../../Constant/Constant';
import PrivateRoute from './../../PrivateRoute';


class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value,
        });
    }

    formSubmit = async (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
        };

        await axios.post(`${BASE_URL}/generate-token`, user)
            .then( async (res) => {
                console.log(res);
                console.log(res.data);
                toast.success("Login success !!", { position: toast.POSITION.BOTTOM_CENTER });
                localStorage.setItem('token', res.data.token);
                //var currentUser = setTimeout(() => this.getCurrentUser(localStorage.getItem('token')), 500);
                var currentUser = await this.getCurrentUser(localStorage.getItem('token'));
                localStorage.setItem('user', JSON.stringify(currentUser));
                PrivateRoute(this.isLoggedIn);
                //redirect ...ADMIN: admin-dashboard
                //redirect ...NORMAL: normal-dashboard
                
                if(this.getUserRole(currentUser) === "ADMIN"){
                    //admin dashboard
                    window.location.href = '/admin';
                } else if (this.getUserRole(currentUser) === "NORMAL"){
                    //normal user dashboard
                    window.location.href = '/user';
                } else {
                    this.logout();
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Login fail !! Please try again", { position: toast.POSITION.BOTTOM_CENTER });
            });
    }

    getCurrentUser = async (token) => {
        var response = await axios.get(`${BASE_URL}/current-user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
   }

    generateToken = (loginData) => {
        return axios.post(`${BASE_URL}/generate-token`, loginData);
    }

    loginUser = (token) => {
        localStorage.setItem('token', token);
        return true;
    }

    isLoggedIn = () => {
        let token = localStorage.getItem('token');
        if(token === undefined || token === '' || token === null){
            return false;
        } else {
            return true;    
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
    }

    getToken = () => {
        localStorage.getItem('token');
    }

    setUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser = async () => {
        let userStr = await localStorage.getItem('user');
        if(userStr != null) {
            return JSON.parse(userStr);
        } else {
            this.logout();
            return null;
        }
    }

    getUserRole = (user) => {
        return user.authorities[0].authority;
    }

    render() {
        var { username, password } = this.state;
        return (

            <div className="background-image" style={{backgroundImage:'url('+ BACKGROUNDS.login_background + ')',}} >
                <div className="row" style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                    </div>

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                        <div className="panel panel-default" style={{ margin: '20px 100px' }} >
                            <div className="panel-body">
                                <img src="../../assets/logo.png" className="img-responsive img-center" alt="Logo" width="100" style={{ paddingTop: 20, }} />
                                <h1 className='text-center' style={{ paddingBottom: 20, }}>Login Here !!</h1>
                                <div>
                                    <form onSubmit={(e) => this.formSubmit(e)}>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"></div>
                                                <input required type="text" className="form-control" placeholder="Username" name='username' value={username} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"></div>
                                                <input required type="password" className="form-control" placeholder="Password" name='password' value={password} onChange={this.onChange} />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <button type="submit" className="btn btn-primary" style={{ marginRight: 5 }}>Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;