import React, { Component } from 'react';
import SimpleList from './../../components/menu/SimpleList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import { BASE_URL } from './../../Constant/Constant';
import { toast } from 'react-toastify';

class Quizzes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: [],
        }
    }
    componentDidMount() {
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/quiz/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            const quizzes = res.data;
            this.setState({ quizzes });
        })
            .catch(error => console.log(error));
    }
    deleteQuiz = (qId) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this Quiz?"
        )
        if (confirmBox === true) {
            var token = localStorage.getItem('token');
            axios.delete(`${BASE_URL}/quiz/${qId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(res => {
                var newQuizzes = this.state.quizzes.filter((quiz) => quiz.qId !== qId);
                this.setState({ quizzes: newQuizzes })
                toast.success("Deleted quiz !", { position: toast.POSITION.BOTTOM_CENTER });
            })
                .catch(error => {
                    console.log(error);
                    toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
                });
        }
    }

    render() {
        var { quizzes } = this.state;
        var elementQuizzes = quizzes.map((quiz, index) => {
            return (
                <div key={index}>
                    <List>
                        <ListItem button component={NavLink} to>
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="./../../assets/exam.png" />
                            </ListItemIcon>

                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                <h5 style={{ fontWeight: 'bold' }}>{quiz.title}</h5>
                                <span>
                                    {quiz.category.title}
                                </span>
                            </div>
                            <ListItemText primary={quiz.description} />



                        </ListItem>
                        <button type="button" className="btn btn-danger">
                            <NavLink to={`/admin/view-questions/${quiz.qId}/${quiz.title}`} style={{ color: 'white' }} >Questions</NavLink>
                        </button>
                        <button type="button" className="btn btn-light" style={{ marginLeft: 10, color: 'red' }}>Max Marks {quiz.maxMarks}</button>
                        <button type="button" className="btn btn-light" style={{ marginLeft: 10, color: 'red' }}>Questions {quiz.numberOfQuestions}</button>
                        <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }}>
                            <NavLink to={`/admin/quiz/${quiz.qId}`} style={{ color: 'white' }} >Update</NavLink>
                        </button>
                        <button type="button" className="btn btn-danger" style={{ marginLeft: 10 }}>Attempts </button>
                        <button onClick={() => this.deleteQuiz(quiz.qId)} type="button" className="btn btn-warning" style={{ marginLeft: 10 }}>Delete </button>


                        <Divider style={{ marginTop: 10 }} />
                    </List>
                </div>
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
                            <h3 style={{ margin: 'auto' }}>Quizzes</h3>
                            <CardContent>
                                {elementQuizzes}
                            </CardContent>
                            <div style={{ marginBottom: 20 }}>
                                <NavLink to="/admin/add-quiz" type="button" className="btn btn-danger">Add New Quiz</NavLink>
                            </div>
                        </Card>
                    </div>
                </div>
            </div >
        );
    }
}

export default Quizzes;