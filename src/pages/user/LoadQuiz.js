import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SimpleListUser from '../../components/menu/SimpleListUser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './../../Constant/Constant';
import Avatar from '@material-ui/core/Avatar';
import { NavLink } from 'react-router-dom';

const LoadQuiz = () => {
    const { catId } = useParams();
    const [quizzes, setQuizzes] = useState([]);
    const [nowCategoryId, setNowCategoryId] = useState(-1);
    
    const getActiveQuizzes = () => {
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/quiz/active`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            //const quizzes = res.data;
            setQuizzes(res.data);
        })
            .catch(error => console.log(error));
    }
    const getActiveQuizzesOfCategory = (cid) => {
        var token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/quiz/category/active/${cid}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            //const quizzes = res.data;
            setQuizzes(res.data);
        })
            .catch(error => console.log(error));
    }
    if (nowCategoryId !== catId) {
        if(catId == 0){
            getActiveQuizzes();
        } else {
            getActiveQuizzesOfCategory(catId);
        }
        setNowCategoryId(catId);
    }
    

    useEffect(() => {

    }, []);
    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <SimpleListUser />
                </div>

                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                    <Card style={{ marginTop: 20 }}>
                        <h3 style={{ margin: 'auto' }}>Available Quizzes</h3>
                        <CardContent>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                            </div>


                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                {
                                    quizzes.length === 0 ?
                                        <div>No data in this category.</div>
                                        :
                                        quizzes.map((quiz, index) => {
                                            return <div key={index}>
                                                <Card style={{ margin: 20 }}>
                                                    <Avatar src='https://png.pngitem.com/pimgs/s/79-794589_quiz-transparent-icon-hd-png-download.png' aria-label="recipe" style={{ scale: '2' }}>

                                                    </Avatar>
                                                    <h3 style={{ margin: 'auto' }}>{quiz.title}</h3>
                                                    <CardContent>
                                                        <h5 style={{ fontWeight: 'bold' }}>{quiz.category.title}</h5>
                                                        <p className='truncate'>{quiz.description}</p>
                                                        <button type="button" style={{ margin: 10 }} className="btn btn-danger">
                                                            <NavLink to style={{ color: 'white' }} >View</NavLink>
                                                        </button>
                                                        <button type="button" className="btn btn-success">
                                                            <NavLink to={`/user/instructions/${quiz.qId}`} style={{ color: 'white' }} >Start {quiz.qid}</NavLink>
                                                        </button>
                                                        <button type="button" className="btn btn-light" style={{ marginLeft: 10, color: 'red' }}>Questions: {quiz.numberOfQuestions}</button>
                                                        <button type="button" className="btn btn-light" style={{ marginLeft: 10, color: 'red' }}>M.M: {quiz.maxMarks}</button>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        })
                                }
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );

}

export default LoadQuiz;