import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BACKGROUNDS } from './../../Constant/Constant';
import { BASE_URL } from './../../Constant/Constant';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            phone: '',
        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value,
        });
    }

    onClear = () => {
        this.setState({
            username: '',
            password: '',
            email: '',
            phone: '',
        });
    }

    formSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone,
        };

        axios.post(`${BASE_URL}/user/`, user)
            .then(res => {
                console.log(res);
                console.log(res.data);
                toast.success("Register successful !!", { position: toast.POSITION.BOTTOM_CENTER });
                this.onClear();
            })
            .catch(error => {
                console.log(error);
                toast.error("Username existed !!", { position: toast.POSITION.BOTTOM_CENTER });
            });
    }

    render() {
        var { username, password, email, phone } = this.state;
        return (
            <div className="background-image" style={{ backgroundImage: 'url(' + BACKGROUNDS.login_background + ')', }} >
                <div className="row" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                    </div>

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                        <div className="panel panel-default" style={{ margin: '20px 100px' }} >
                            <div className="panel-body">
                                <img src="../../assets/logo.png" className="img-responsive img-center" alt="Logo" width="100" style={{ paddingTop: 20, }} />
                                <h1 className='text-center' style={{ paddingBottom: 20, }}>Register Here !!</h1>
                                <div>
                                    <form onSubmit={(e) => this.formSubmit(e)}>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"></div>
                                                <input required type="text" className="form-control" placeholder="Username" name='username' value={username} onChange={this.onChange} />
                                            </div>
                                            <small className="text-muted" style={{ color: 'red',}}>
                                                Username must be unique !!
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"></div>
                                                <input required type="password" className="form-control" placeholder="Password" name='password' value={password} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"></div>
                                                <input required type="text" className="form-control" placeholder="Email" name='email' value={email} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon"></div>
                                                <input required type="number" className="form-control" placeholder="Phone" name='phone' value={phone} onChange={this.onChange} />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <button type="submit" className="btn btn-primary" style={{ marginRight: 5 }}>Register</button>
                                            <button type="button" onClick={this.onClear} className="btn btn-danger">Clear</button>
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

export default Register;