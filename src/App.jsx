import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './css/main.css';
import AdminLayout from './layout/Admin/AdminLayout.jsx';
import Quiz from './pages/Quiz.jsx';
import Home from './pages/Home.jsx';
import QuizDetails from './pages/QuizDetail.jsx';
import QuizTest from './pages/QuizTest.jsx'; // Import component mới

function App() {
    return (
        <Router>
            <div className="min-h-screen w-full bg-gray-100">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<AdminLayout />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/quizdetail/:title" element={<QuizDetails />} />
                    <Route path="/quiz/:id" element={<QuizTest />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;