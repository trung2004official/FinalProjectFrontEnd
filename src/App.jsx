import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './css/main.css';
import HomeLayout from './layout/User/HomeLayout.jsx';
import AdminLayout from './layout/Admin/AdminLayout.jsx';

function App() {
    return (
        <Router>
            <div className="min-h-screen w-full bg-gray-100">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<AdminLayout />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;