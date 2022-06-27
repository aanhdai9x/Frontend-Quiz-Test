import React, { useState, useEffect } from 'react';
import SimpleList from './../../components/menu/SimpleList';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './../../Constant/Constant';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddQuestion = () => {
    const { qid, qtitle } = useParams();

    const initStateQuestion = {
        content: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: '',
        quiz: {},
    }
    const [question, setQuestion] = useState(initStateQuestion);
    const [content, setContent] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [answer, setAnswer] = useState("");
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        question.quiz['qId'] = qid;
        console.log(question);
    }, []);
    const formSubmit = (event) => {
        event.preventDefault();
        if (question.answer === "") {
            toast.error("Please Select answer !", { position: toast.POSITION.BOTTOM_CENTER });
        } else {
            var token = localStorage.getItem('token');
            console.log(question);
            axios.post(`${BASE_URL}/question/`, question, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(res => {
                console.log(res.data);
                toast.success("Question is added !", { position: toast.POSITION.BOTTOM_CENTER });
                alert("Question is added !");
                window.location.href = "/admin/quizzes";
            })
                .catch(error => {
                    console.log(error);
                    toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
                });
        }
        console.log(question);
    }
    const onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        console.log(name + ": " + value);
        if (name === 'content') {
            // question.content = value;
            // setContent(value);
            // setQuestion(question);
        } else if (name === 'option1') {
            question.option1 = value;
            setOption1(value);
            setQuestion(question);
        } else if (name === 'option2') {
            question.option2 = value;
            setOption2(value);
            setQuestion(question);
        } else if (name === 'option3') {
            question.option3 = value;
            setOption3(value);
            setQuestion(question);
        } else if (name === 'option4') {
            question.option4 = value;
            setOption4(value);
            setQuestion(question);
        } else if (name === 'answer') {
            question.answer = value;
            setAnswer(value);
            setQuestion(question);
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
                        <h3 style={{ margin: 'auto' }}>Adding Question to <span style={{ fontWeight: 'bold' }}>{qtitle}</span></h3>
                        <CardContent>
                            <h5 style={{ margin: 'auto' }}>Enter the detail of the new question</h5>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">

                            </div>


                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <form onSubmit={formSubmit}>

                                    {/* <div className="form-group" style={{ textAlign: 'left' }}>
                                        <label >Question content <span style={{color: 'red'}}>*</span></label>
                                        <textarea required rows='5' className="form-control" placeholder="Enter here ..." name='content' value={question.content} onChange={onChange} />
                                    </div> */}
                                    <div className="form-group" style={{ textAlign: 'left' }}>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data="<p></p>"
                                            name='content'
                                            value={question.content}
                                            onReady={editor => {
                                                // You can store the "editor" and use when it is needed.
                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setContent(data);
                                                question.content = data;
                                                setQuestion(question);
                                                console.log({ event, editor, data });
                                            }}
                                            onBlur={(event, editor) => {
                                                console.log('Blur.', editor);
                                            }}
                                            onFocus={(event, editor) => {
                                                console.log('Focus.', editor);
                                            }}
                                        />
                                    </div>

                                    <div className="form-group" style={{ textAlign: 'left' }}>

                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <label >Option 1 <span style={{ color: 'red' }}>*</span></label>
                                            <input required type="text" className="form-control" placeholder="Option 1" name='option1' value={question.option1} onChange={onChange} />
                                        </div>

                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <label >Option 2 <span style={{ color: 'red' }}>*</span></label>
                                            <input required type="text" className="form-control" placeholder="Option 2" name='option2' value={question.option2} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ textAlign: 'left' }}>

                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <label >Option 3</label>
                                            <input type="text" className="form-control" placeholder="Option 3" name='option3' value={question.option3} onChange={onChange} />
                                        </div>

                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                            <label >Option 4</label>
                                            <input type="text" className="form-control" placeholder="Option 4" name='option4' value={question.option4} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Select Answer <span style={{ color: 'red' }}>*</span></label>
                                        <select className="form-control" name="answer" value={question.answer} onChange={onChange}>
                                            <option></option>
                                            {question.option1 !== "" ? <option>{question.option1}</option> : null}
                                            {question.option2 !== "" ? <option>{question.option2}</option> : null}
                                            {question.option3 !== "" ? <option>{question.option3}</option> : null}
                                            {question.option4 !== "" ? <option>{question.option4}</option> : null}
                                        </select>
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

export default AddQuestion;