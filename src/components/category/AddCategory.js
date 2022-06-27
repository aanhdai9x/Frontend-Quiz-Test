import React, { Component } from 'react';
import SimpleList from './../../components/menu/SimpleList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import { BASE_URL } from './../../Constant/Constant';
import { toast } from 'react-toastify';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            message: '',
        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name]: value,
        });
    }
    formSubmit = (event) => {
        event.preventDefault();
        var token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/category/`, {
            title: this.state.title,
            description: this.state.description,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            console.log(res);
            var message;
            if(res.status ===200){
                message = "Add " + res.data.title + " successful !!";
            }
            this.setState({ message: message });
            toast.success(message , { position: toast.POSITION.BOTTOM_CENTER });
        })
            .catch(error => {
                console.log(error);
                toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
            });
        
    }
    render() {
        var { title, description } = this.state;
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <SimpleList />
                    </div>

                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <Card style={{ marginTop: 20 }}>
                            <CardContent>

                                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                                </div>


                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <form onSubmit={this.formSubmit}>
                                        <legend>Add New Category</legend>

                                        <div className="form-group" style={{ textAlign: 'left' }}>
                                            <label >Title <span style={{color: 'red'}}>*</span></label>
                                            <input required type="text" className="form-control" placeholder="Title" name='title' value={title} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group" style={{ textAlign: 'left' }}>
                                            <label >Description</label>
                                            <textarea rows='10' className="form-control" placeholder="Description" name='description' value={description} onChange={this.onChange} />
                                        </div>
                                        <button type="submit" style={{ marginBottom: 20 }} className="btn btn-danger">Add</button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div >
        );
    }
}

export default AddCategory;