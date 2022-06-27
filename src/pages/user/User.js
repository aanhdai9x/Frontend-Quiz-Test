import React, { Component } from 'react';
import SimpleListUser from './../../components/menu/SimpleListUser';

class User extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <SimpleListUser />
                    </div>

                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <h1>Welcome to USER Dashboard</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;