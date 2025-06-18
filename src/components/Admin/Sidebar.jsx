import React from 'react';
import Logo from '../../assets/quiztech_logo.svg';
import quizIcon from '../../assets/quiz-icon.svg';
import questionIcon from '../../assets/message.svg';
import statsIcon from '../../assets/search.svg';

const ItemContainer = ({ logo, title, setActiveTab, tab }) => (
    <div
        className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors"
        onClick={() => setActiveTab(tab)}
    >
        <img src={logo} alt="" className="w-6 h-6" />
        <span className="font-semibold">{title}</span>
    </div>
);

const Sidebar = ({ setActiveTab }) => (
    <aside className="w-64 bg-gray-800 p-4 flex flex-col gap-4">
        <div className="border-b-2 border-gray-600 pb-4">
            <img src={Logo} alt="QuizTech" className="w-20 h-20 mx-auto" />
        </div>
        <ItemContainer logo={statsIcon} title="Thống kê" setActiveTab={setActiveTab} tab="stats" />
        <ItemContainer logo={quizIcon} title="Đề thi" setActiveTab={setActiveTab} tab="quizzes" />
        <ItemContainer logo={questionIcon} title="Câu hỏi" setActiveTab={setActiveTab} tab="questions" />
        <ItemContainer logo={quizIcon} title="Tài khoản" setActiveTab={setActiveTab} tab="accounts" />
        <ItemContainer logo={quizIcon} title="Danh mục" setActiveTab={setActiveTab} tab="categories" />
        <ItemContainer logo={quizIcon} title="Phản hồi" setActiveTab={setActiveTab} tab="feedback" />
    </aside>
);

export default Sidebar;