import React, { useState, useEffect } from 'react';
import SimpleList from './../../components/menu/SimpleList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { BASE_URL } from './../../Constant/Constant';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const UpdateQuiz = () => {
    const { qid } = useParams();
    const quizInitState = {
        qId: 0,
        title: "",
        description: "",
        maxMarks: "",
        numberOfQuestions: "",
        active: true,
        category: {
            cid: 0,
            title: "",
            description: ""
        }
    }
    const [quiz, setQuiz] = useState(quizInitState);
    const [categories, setCategories] = useState([]);
    const [cid, setCid] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [maxMarks, setMaxMarks] = useState("");
    const [numberOfQuestions, setNumberOfQuestions] = useState("");
    const [active, setActive] = useState(false);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        return () => {
            // Update the document title using the browser API
            var token = localStorage.getItem('token');
            axios.get(`${BASE_URL}/quiz/${qid}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(res => {
                const quiz = res.data;
                setQuiz(quiz);
                setCid(quiz.category.cid);
            })
                .catch(error => {
                    console.log(error.message);
                    toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
                });
            //////////////
            axios.get(`${BASE_URL}/category/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(res => {
                const categories = res.data;
                setCategories(categories);
            })
                .catch(error => {
                    console.log(error);
                    toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
                });
        }

    }, []);
    const setCategoryByCid = (cid) => {
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/category/${cid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            const category = res.data;
            quiz.category = category;
            setQuiz(quiz);
        })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
            });
    }
    const formSubmit = (event) => {
        event.preventDefault();
        var token = localStorage.getItem('token');
        axios.put(`${BASE_URL}/quiz/`, quiz, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            toast.success("Quiz is updated !", { position: toast.POSITION.BOTTOM_CENTER });
        })
            .catch(error => {
                console.log(error);
                toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
            });
    }
    const onChange = (event) => {
        var name = event.target.name;
        var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        console.log(name + ": " + value);
        if (name === 'cid') {
            setCategoryByCid(value);
            setCid(value);
        } else if (name === 'title') {
            quiz.title = value;
            setTitle(value);
            setQuiz(quiz);
        } else if (name === 'description') {
            quiz.description = value;
            setDescription(value);
            setQuiz(quiz);
        } else if (name === 'maxMarks') {
            quiz.maxMarks = value;
            setMaxMarks(value);
            setQuiz(quiz);
        } else if (name === 'numberOfQuestions') {
            quiz.numberOfQuestions = value;
            setNumberOfQuestions(value);
            setQuiz(quiz);
        } else if (name === 'active') {
            quiz.active = value;
            setActive(value);
            setQuiz(quiz);
        }
    }
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
                                <form onSubmit={formSubmit}>
                                    <legend>Update Quiz</legend>

                                    <div className="form-group" style={{ textAlign: 'left' }}>
                                        <label >Title <span style={{ color: 'red' }}>*</span></label>
                                        <input required type="text" className="form-control" placeholder="Title" name='title' value={quiz.title} onChange={onChange} />
                                    </div>
                                    <div className="form-group" style={{ textAlign: 'left' }}>
                                        <label >Description</label>
                                        <textarea rows='5' className="form-control" placeholder="Description" name='description' value={quiz.description} onChange={onChange} />
                                    </div>
                                    <div className="form-group" style={{ textAlign: 'left' }}>

                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <label >Maximum Marks</label>
                                            <input required type="number" className="form-control" placeholder="Maximum Marks" name='maxMarks' value={quiz.maxMarks} onChange={onChange} />
                                        </div>

                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <label >Number of questions</label>
                                            <input required type="number" className="form-control" placeholder="Number of questions" name='numberOfQuestions' value={quiz.numberOfQuestions} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Category select</label>
                                        <select className="form-control" name="cid" value={cid} onChange={onChange}>
                                            {categories.map((category, index) => {
                                                return (
                                                    <option key={index} value={category.cid}>{category.title}</option>
                                                )

                                            })}
                                        </select>
                                    </div>
                                    <div className="checkbox" >
                                        <label style={{ marginTop: 10 }}>
                                            <input
                                                name="active"
                                                type="checkbox"
                                                checked={quiz.active}
                                                onChange={onChange}
                                            /> Publish status
                                        </label>
                                    </div>
                                    <button type="submit" style={{ margin: 10 }} className="btn btn-danger">Update</button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );

}

export default UpdateQuiz;