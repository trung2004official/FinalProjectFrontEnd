import React, { useState } from 'react';
import Header from '../../components/Admin/Header.jsx';
import Sidebar from '../../components/Admin/Sidebar';
import QuizManagement from '../../components/Admin/QuizManagement';
import QuestionManagement from '../../components/Admin/QuestionManagement';
import Statistics from '../../components/Admin/Statistics.jsx';

const AdminLayout = () => {
    const [activeTab, setActiveTab] = useState('stats');

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6">
                    {activeTab === 'stats' && <Statistics />}
                    {activeTab === 'quizzes' && <QuizManagement />}
                    {activeTab === 'questions' && <QuestionManagement />}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;