import React, { useState } from 'react';
import Header from '../../components/Admin/Header';
import Sidebar from '../../components/Admin/Sidebar';
import QuizManagement from '../../components/Admin/QuizManagement';
import QuestionManagement from '../../components/Admin/QuestionManagement';
import Statistics from '../../components/Admin/Statistics.jsx';
import AccountManagement from '../../components/Admin/AccountManagement';
import CategoryManagement from '../../components/Admin/CategoryManagement';
import FeedbackManagement from '../../components/Admin/FeedbackManagement';

const AdminLayout = () => {
    const [activeTab, setActiveTab] = useState('stats');
    return (
        <div className="flex min-h-screen bg-PurpleNavy text-white">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="container mx-auto p-6">
                    {activeTab === 'stats' && <Statistics />}
                    {activeTab === 'quizzes' && <QuizManagement />}
                    {activeTab === 'questions' && <QuestionManagement />}
                    {activeTab === 'accounts' && <AccountManagement />}
                    {activeTab === 'categories' && <CategoryManagement />}
                    {activeTab === 'feedback' && <FeedbackManagement />}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;