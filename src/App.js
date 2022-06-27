import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/authentication/Register';
import Welcome from './components/Welcome';
import Login from './components/authentication/Login';
import Header from './components/Header';
import Admin from './pages/admin/Admin';
import User from './pages/user/User';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './PrivateRoute';
import Profile from './components/Profile';
import Category from './components/category/Category';
import AddCategory from './components/category/AddCategory';
import Quizzes from './components/quiz/Quizzes';
import AddQuiz from './components/quiz/AddQuiz';
import UpdateQuiz from './components/quiz/UpdateQuiz';
import ViewQuizQuestions from './components/quiz/ViewQuizQuestions';
import AddQuestion from './components/question/AddQuestion';
import LoadQuiz from './pages/user/LoadQuiz';
import Instructions from './components/instruction/Instructions';
import Start from './components/start/Start';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route exact path="/admin/profile" element={<Profile />} />
            <Route exact path="/admin/categories" element={<Category />} />
            <Route exact path="/admin/add-category" element={<AddCategory />} />
            <Route exact path="/admin/quizzes" element={<Quizzes />} />
            <Route exact path="/admin/add-quiz" element={<AddQuiz />} />
            <Route exact path="/admin/quiz/:qid" element={<UpdateQuiz/>}/>
            <Route exact path="/admin/view-questions/:qid/:qtitle" element={<ViewQuizQuestions/>}/>
            <Route exact path="/admin/add-question/:qid/:qtitle" element={<AddQuestion/>}/>
            <Route exact path="/user/:catId" element={<LoadQuiz />}/>
            <Route exact path="/user/instructions/:qid" element={<Instructions />}/>
            <Route exact path="/user/start/:qid" element={<Start />}/>

            <Route exact path="/user" element={<User />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>


    </div>
  );
}

export default App;