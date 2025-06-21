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
    const [data, setData] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + 10;
    const currentData = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / 10);

    const handlePageClick = (e) => {
        const newOffset = (e.selected * 10) % data.length;
        setItemOffset(newOffset);
    }

    return (
        <div className="flex min-h-screen bg-PurpleNavy text-white">
            <Sidebar setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="container mx-auto p-6">
                    {activeTab === 'stats' && <Statistics />}
                    {activeTab === 'quizzes' && <QuizManagement
                        quizzes={data}
                        setQuizzes={setData}
                        itemOffset={itemOffset}
                        setItemOffset={setItemOffset}
                        currentQuizzes={currentData}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                    />}
                    {activeTab === 'questions' && <QuestionManagement
                        questions={data}
                        setQuestions={setData}
                        itemOffset={itemOffset}
                        setItemOffset={setItemOffset}
                        currentQuestions={currentData}
                        pageCount={pageCount}
                        onPageChange={handlePageClick} />}
                    {activeTab === 'accounts' && <AccountManagement
                        accounts={data}
                        setAccounts={setData}
                        itemOffset={itemOffset}
                        setItemOffset={setItemOffset}
                        currentAccounts={currentData}
                        pageCount={pageCount}
                        onPageChange={handlePageClick} />}
                    {activeTab === 'categories' && <CategoryManagement
                        categories={data}
                        setCategories={setData}
                        itemOffset={itemOffset}
                        setItemOffset={setItemOffset}
                        currentCategories={currentData}
                        pageCount={pageCount}
                        onPageChange={handlePageClick} />}
                    {activeTab === 'feedback' && <FeedbackManagement
                        feedbacks={data}
                        setFeedbacks={setData}
                        itemOffset={itemOffset}
                        setItemOffset={setItemOffset}
                        currentFeedbacks={currentData}
                        pageCount={pageCount}
                        onPageChange={handlePageClick} />}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;