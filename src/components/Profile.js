import React, { Component } from 'react';
import SimpleList from './../components/menu/SimpleList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class Profile extends Component {
    render() {
        var user = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <SimpleList />
                    </div>

                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <Card style={{ marginTop: 20 }}>
                            <h3 style={{ margin: 'auto' }}>Your profile details</h3>
                            <CardContent>
                                <div>
                                    <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg" className="img-responsive profile-image" alt="AvatarImage" />
                                </div>
                                <h1>{user.email}</h1>
                                <div className="row">
                                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">

                                    </div>
                                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ">
                                        <table className="table table-bordered table-hover" style={{ border: '2px solid red' }}>
                                            <tbody>
                                                <tr>
                                                    <td>Username</td>
                                                    <td>{user.username}</td>
                                                </tr>
                                                <tr>
                                                    <td>UserId</td>
                                                    <td>UID{user.id}</td>
                                                </tr>
                                                <tr>
                                                    <td>Phone</td>
                                                    <td>{user.phone}</td>
                                                </tr>
                                                <tr>
                                                    <td>Role</td>
                                                    <td>{user.authorities[0].authority}</td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>{user.enabled ? 'ACTIVE' : 'INACTIVE'}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>

                            </CardContent>
                            <div style={{ marginBottom: 20 }}>
                                <button type="button" className="btn btn-success">UPDATE</button>
                                <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }}>SHARE</button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;