import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SimpleListUser from '../../components/menu/SimpleListUser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from './../../Constant/Constant';
import { Divider } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Instructions = () => {
    const { qid } = useParams();
    const [quiz, setQuiz] = useState({});
    useEffect(() => {
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/quiz/${qid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            const quiz = res.data;
            setQuiz(quiz);
        })
            .catch(error => {
                console.log(error);
                toast.error("Error in loading data !", { position: toast.POSITION.BOTTOM_CENTER });
            });

    }, []);
    const onStartQuiz = () => {
        const confirmBox = window.confirm(
            "Do you really want to start this Quiz?"
        )
        if (confirmBox === true) {
            window.location.pathname=`/user/start/${qid}`;
        }
    }
    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <SimpleListUser />
                </div>

                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <Card style={{ marginTop: 20 }}>
                        <h3 style={{ margin: 'auto' }}>Read the instruction of this page carefully</h3>
                        <h6 style={{ color: 'gray' }}>One step more to go</h6>
                        <CardContent>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                            </div>


                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <h1>{quiz.title}</h1>
                                <p>{quiz.description}</p>
                                <Divider style={{ backgroundColor: 'black' }} />
                                <br />
                                <h1>Important Instructions</h1>
                                <ul>
                                    <li>This quiz is only for practice purpose.</li>
                                    <li>You have to submit quiz with in time <b>{quiz.numberOfQuestions * 2} minutes</b>. </li>
                                    <li>You can attempt the quiz any number of time.</li>
                                    <li>There are <b>{quiz.numberOfQuestions} questions</b> in this quiz</li>
                                    <li>Each question carries <b>{(quiz.maxMarks / quiz.numberOfQuestions).toFixed(2)} marks</b>. No negative marking for wrong ones.</li>
                                    <li>All questions is of MCQ Types.</li>
                                </ul>
                                <br />
                                <h1>Attempting Quiz</h1>
                                <li>Click <b>Start Quiz</b> button to start the quiz.</li>
                                <li>The time will start the moment you click the Start Test button.</li>
                                <li>You can not resume this quiz, if interrupted due to any reason.</li>
                                <li>Scroll down to move to next question.</li>
                                <li>Click on Submit Quiz button on completion of the quiz.</li>
                                <li>Report of the test is automatically generated in the form of PDF copy.</li>
                                <br />
                                <div>
                                    <button onClick={() => onStartQuiz()} type="button" className="btn btn-danger" style={{margin: 30}}>
                                        Start Quiz
                                    </button>
                                </div>

                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}

export default Instructions;