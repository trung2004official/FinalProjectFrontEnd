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
import QuizManagement from './pages/Admin/QuizManagement.jsx';
import QuestionManagement from './pages/Admin/QuestionManagement.jsx';
import Statistics from './pages/Admin/Statistics.jsx';
import AccountManagement from './pages/Admin/AccountManagement.jsx';
import CategoryManagement from './pages/Admin/CategoryManagement.jsx'; import FeedbackManagement from './pages/Admin/FeedbackManagement.jsx';
import QuizManagementDetails from './pages/Admin/Quiz/QuizManagementDetails.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import History from './pages/History.jsx'; // Import History component
import HistoryDetail from './pages/HistoryDetail.jsx';

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="min-h-screen w-full bg-gray-100">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Statistics />} />
                            <Route path="quizzes" element={<QuizManagement />} />
                            <Route path='quizzes/:id' element={<QuizManagementDetails />} />
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
                        <Route path="/quiz/result" element={<QuizResult />} /> 
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/history" element={<History />} /> {/* Route cho lịch sử làm bài */}
                        <Route path="/history/:id" element={<HistoryDetail />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;