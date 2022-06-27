import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from './../../Constant/Constant';
import { Divider } from '@material-ui/core';
import parse from 'html-react-parser';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

const Start = () => {
    const { qid } = useParams();
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState("");
    var [correctAnswer, setCorrectAnswer] = useState(0);
    var [marksGot, setMarksGot] = useState(0);
    var [attempted, setAttempted] = useState(0);
    var [timer, setTimer] = useState(1000);

    const [isSubmit, setIsSubmit] = useState(false);
    const preventBackButton = () => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    }

    const startTimer = () => {
        let t = window.setInterval(() => {
            //code
            if (timer <= 0) {
                //evalQuiz();
                autoEndQuiz();
                clearInterval(t);
            } else {
                timer = timer - 0.5;
                setTimer(timer);
            }
        }, 1000);
    }

    const getFormattedTime = () => {
        let mm = Math.floor(timer / 60);
        let ss = timer - mm * 60;
        return `${mm} min : ${ss} sec`
    }
    const getQuestionsOfQuizForTest = () => {
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/question/quiz/${qid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            const questions = res.data;
            setTitle(questions[0].quiz.title);
            timer = questions.length * 2 * 60;
            setTimer(timer);

            setQuestions(questions);
            startTimer();
        })
            .catch(error => {
                console.log(error);
                toast.error("Error in loading data !", { position: toast.POSITION.BOTTOM_CENTER });
            });
    }
    useEffect(() => {
        preventBackButton();
        getQuestionsOfQuizForTest();
    }, []);

    const submitQuiz = () => {
        const confirmBox = window.confirm(
            "Do you really want to submit this Quiz?"
        )
        if (confirmBox === true) {
            evalQuiz();
        }
    }

    const autoEndQuiz = () => {
        setIsSubmit(true);
        // console.log("Total correct answers: " + correctAnswer);
        // console.log("Marks Got: " + marksGot);
        // console.log("Attempted: " + attempted);
    }

    const evalQuiz = () => {
        var token = localStorage.getItem('token');
        axios.post(`${BASE_URL}/question/eval-quiz`, questions, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            //console.log(res.data);
            setMarksGot(res.data.marksGot);
            setAttempted(res.data.attempted);
            setCorrectAnswer(res.data.correctAnswers);
            setIsSubmit(true);
        })
            .catch(error => {
                console.log(error);
                toast.error("Error in eval quiz !", { position: toast.POSITION.BOTTOM_CENTER });
            });
    }
    const onChange = (event) => {
        var name = event.target.name;
        var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        questions[name].givenAnswer = value;
        correctAnswer = 0;
        marksGot = 0;
        attempted = 0;
        questions.forEach(question => {
            if (question.givenAnswer == question.answer) {
                correctAnswer++;
                setCorrectAnswer(correctAnswer);
                let marksSingle = question.quiz.maxMarks / questions.length;
                marksGot = marksGot + marksSingle;
                setMarksGot(marksGot);
            }
            if (question.givenAnswer != '') {
                attempted++;
                setAttempted(attempted);
            }
        });
    }

    const printPage = () => {
        console.log("print Page !!!");
        window.print();
    }

    return (
        <div>
            {!isSubmit
                ? <div className="container-fluid" >
                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <Card style={{ marginTop: 20, width: '200px', position: 'fixed'}} >
                                <CardContent>
                                    <h4><b>Instructions</b></h4>
                                    <ul style={{textAlign: 'left'}}>
                                        <li>Do not refresh the page otherwise you will get new questions in this quiz.</li>
                                        <li>Do not switch the tabs.</li>
                                        <li>Do not minimize the window.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <Card style={{ marginTop: 20 }}>
                                <h3 style={{ margin: 'auto' }}>On Going Quiz <b>{title}</b></h3>
                                <CardContent>
                                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">

                                    </div>

                                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                                        {
                                            questions.map((question, index) => {
                                                return <div key={index} style={{ margin: 30 }}>
                                                    <Card>
                                                        <CardContent>
                                                            <p> Q{index + 1}, <span>{parse(question.content)}</span></p>
                                                            <Divider style={{ backgroundColor: 'black' }} />
                                                            <div onChange={(event) => onChange(event)}>
                                                                <div className="row">
                                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input type="radio" name={index} value={question.option1} />
                                                                                {question.option1}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input type="radio" name={index} value={question.option2} />
                                                                                {question.option2}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input type="radio" name={index} value={question.option3} />
                                                                                {question.option3}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                                                        <div className="radio">
                                                                            <label>
                                                                                <input type="radio" name={index} value={question.option4} />
                                                                                {question.option4}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            })
                                        }
                                        <CardActions>
                                            <Button onClick={() => submitQuiz()} style={{ backgroundColor: 'red', color: 'white' }} size="large">Submit Quiz</Button>
                                        </CardActions>
                                    </div>

                                </CardContent>
                            </Card>
                        </div>

                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <Card style={{ marginTop: 20, position: 'fixed' }} >
                                <CardContent>
                                    <h4><b>Progress</b></h4>
                                    <p>Quiz will automatically submitted when timer reaches to <b>0:0</b></p>
                                    <h4>{getFormattedTime()}</h4>
                                    <CircularProgress color="secondary" variant="determinate" value={(timer / (questions.length * 2 * 60)) * 100} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div >
                : <div className="container-fluid" >
                    <div className="row">
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            {/* <SimpleListUser /> */}
                            instructions
                        </div>

                        <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                            <Card style={{ marginTop: 20 }}>
                                <h3 style={{ margin: 'auto' }}>Quiz Result</h3>
                                <CardContent>
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                        <h3>Marks Got: <b>{marksGot.toFixed(2)}</b></h3>
                                        <h3>Total Correct Answers: <b>{correctAnswer}</b></h3>
                                        <h3>Questions Attempted: <b>{attempted}</b></h3>
                                        <div>
                                            <button onClick={() => printPage()} type="button" style={{ margin: 10 }} className="btn btn-danger">
                                                <NavLink to style={{ color: 'white' }} > Print </NavLink>
                                            </button>
                                            <button type="button" className="btn btn-primary">
                                                <NavLink to={`/user/0`} style={{ color: 'white' }} >Home</NavLink>
                                            </button>
                                        </div>

                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div >

            }
        </div>
    );


}

export default Start;