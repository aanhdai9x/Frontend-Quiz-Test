import React, { Component } from 'react';
import SimpleList from './../../components/menu/SimpleList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import { BASE_URL } from '../../Constant/Constant';
import { toast } from 'react-toastify';

class AddQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            maxMarks: '',
            numberOfQuestions: '',
            cid: '55',
            active: true,

            message: '',
            categories: [],
        }
    }
    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({
            [name]: value,
        });
    }
    formSubmit = (event) => {
        event.preventDefault();
        var token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/quiz/`, {
            title: this.state.title,
            description: this.state.description,
            maxMarks: this.state.maxMarks,
            numberOfQuestions: this.state.numberOfQuestions,
            category: {
                cid: this.state.cid,
            },
            active: this.state.active,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            console.log(res);
            var message;
            if (res.status === 200) {
                message = "Quiz is added !!";
            }
            this.setState({ message: message });
            toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });
            this.setState({
                title: '',
                description: '',
                maxMarks: '',
                numberOfQuestions: '',
                cid: '55',
                active: true,
            });
        })
            .catch(error => {
                console.log(error);
                toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
            });
    }
    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/category/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            const categories = res.data;
            this.setState({ categories });
        })
            .catch(error => {
                console.log(error);
                toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
            });
    }
    render() {
        var { title, description, maxMarks, numberOfQuestions, categories } = this.state;
        var elementCategories = categories.map((category, index) => {
            return (
                <option key={index} value={category.cid}>{category.title}</option>
            )

        });
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
                                        <legend>Add New Quiz</legend>

                                        <div className="form-group" style={{ textAlign: 'left' }}>
                                            <label >Title <span style={{ color: 'red' }}>*</span></label>
                                            <input required type="text" className="form-control" placeholder="Title" name='title' value={title} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group" style={{ textAlign: 'left' }}>
                                            <label >Description</label>
                                            <textarea rows='5' className="form-control" placeholder="Description" name='description' value={description} onChange={this.onChange} />
                                        </div>
                                        <div className="form-group" style={{ textAlign: 'left' }}>

                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <label >Maximum Marks</label>
                                                <input required type="number" className="form-control" placeholder="Maximum Marks" name='maxMarks' value={maxMarks} onChange={this.onChange} />
                                            </div>

                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <label >Number of questions</label>
                                                <input required type="number" className="form-control" placeholder="Number of questions" name='numberOfQuestions' value={numberOfQuestions} onChange={this.onChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Category select</label>
                                            <select className="form-control" name="cid" value={this.state.cid} onChange={this.onChange}>
                                                {elementCategories}
                                            </select>
                                        </div>
                                        <div className="checkbox" >
                                            <label style={{ marginTop: 10 }}>
                                                <input
                                                    name="active"
                                                    type="checkbox"
                                                    checked={this.state.active}
                                                    onChange={this.onChange}
                                                /> Publish status
                                            </label>
                                        </div>
                                        <button type="submit" style={{ margin: 10 }} className="btn btn-danger">Add</button>
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

export default AddQuiz;