import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './css/main.css';
import AdminLayout from './layout/Admin/AdminLayout.jsx';
import Quiz from './pages/Quiz.jsx';
import Home from './pages/Home.jsx';
import QuizDetails from './pages/QuizDetail.jsx';
import QuizTest from './pages/QuizTest.jsx';
import QuizResult from './pages/QuizResult.jsx'; // Import component mới
import Profile from './pages/Profile.jsx';
import QuizManagement from './components/Admin/QuizManagement';
import QuestionManagement from './components/Admin/QuestionManagement';
import Statistics from './components/Admin/Statistics.jsx';
import AccountManagement from './components/Admin/AccountManagement';
import CategoryManagement from './components/Admin/CategoryManagement'; import FeedbackManagement from './components/Admin/FeedbackManagement';

function App() {
    return (
        <Router>
            <div className="min-h-screen w-full bg-gray-100">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Statistics />} />
                        <Route path="quizzes" element={<QuizManagement />} />
                        <Route path="questions" element={<QuestionManagement />} />
                        <Route path="accounts" element={<AccountManagement />} />
                        <Route path="categories" element={<CategoryManagement />} />
                        <Route path="feedback" element={<FeedbackManagement />} />
                    </Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/quiz/:id" element={<QuizDetails />} />
                    <Route path="/quizzes-questions/:quizId" element={<QuizTest />} />
                    <Route path="/quiz/result/:id" element={<QuizResult />} /> {/* Route cho kết quả */}
                    <Route path="/profile/:username" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;