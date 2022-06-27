import React, { useState, useEffect } from 'react';
import SimpleList from './../../components/menu/SimpleList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './../../Constant/Constant';
import { toast } from 'react-toastify';
import { Divider } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import parse from 'html-react-parser';

const ViewQuizQuestions = () => {
    const { qid, qtitle } = useParams();
    const [questions, setQuestions] = useState([]);
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/question/quiz/${qid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            console.log(res.data);
            setQuestions(res.data);
        })
            .catch(error => {
                console.log(error.message);
                toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
            });
    }, []);
    const deleteQuestion = (quesId) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this Question?"
        )
        if (confirmBox === true) {
            var token = localStorage.getItem('token');
            axios.delete(`${BASE_URL}/question/${quesId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(res => {
                var newQuestions = questions.filter((question) => question.quesId !== quesId);
                setQuestions(newQuestions);
                toast.success("Deleted question !", { position: toast.POSITION.BOTTOM_CENTER });
            })
                .catch(error => {
                    console.log(error);
                    toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
                });
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
                        <h3 style={{ margin: 'auto' }}>Questions of {qtitle}</h3>

                        <button type="button" style={{ margin: 10 }} className="btn btn-danger">
                            <NavLink to={`/admin/add-question/${qid}/${qtitle}`} style={{ color: 'white' }} >Add Question</NavLink>
                        </button>

                        <CardContent>
                            {questions.map((question, index) => {
                                return (
                                    <div key={index} style={{ textAlign: 'left' }}>
                                        <p style={{ marginTop: 50 }}>
                                            <b>Q{index + 1}, </b>
                                            <span>{parse(question.content)}</span>
                                        </p>

                                        <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <p>
                                                    <b>1, </b>
                                                    <span>{question.option1}</span>
                                                </p>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <p>
                                                    <b>2, </b>
                                                    <span>{question.option2}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <p>
                                                    <b>3, </b>
                                                    <span>{question.option3}</span>
                                                </p>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                <p>
                                                    <b>4, </b>
                                                    <span>{question.option4}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <Divider />
                                        <p><b>Correct Answer: </b> {question.answer}</p>
                                        <CardActions>
                                            <Button onClick={() => deleteQuestion(question.quesId)} style={{ backgroundColor: 'red', color: 'white' }} size="small">Delete</Button>
                                            <Button style={{ backgroundColor: 'blue', color: 'white' }} size="small">Update</Button>
                                        </CardActions>
                                        <Divider style={{ backgroundColor: 'black' }} />
                                    </div>
                                )

                            })}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );

}

export default ViewQuizQuestions;