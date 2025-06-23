import React from 'react';
import Logo from '../../assets/quiztech_logo.svg';
import quizIcon from '../../assets/quiz-icon.svg';
import questionIcon from '../../assets/message.svg';
import statsIcon from '../../assets/search.svg';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/admin', icon: statsIcon, label: 'Thống kê', end: true },
    { to: '/admin/quizzes', icon: quizIcon, label: 'Đề thi' },
    { to: '/admin/questions', icon: questionIcon, label: 'Câu hỏi' },
    { to: '/admin/accounts', icon: quizIcon, label: 'Tài khoản' },
    { to: '/admin/categories', icon: quizIcon, label: 'Danh mục' },
    { to: '/admin/feedback', icon: quizIcon, label: 'Phản hồi' },
];

const Sidebar = () => (
    <aside className="w-64 bg-CetaceanBlue p-4 flex flex-col gap-4">
        <div className="border-b-2 border-gray-600 pb-4">
            <img src={Logo} alt="QuizTech" className="w-20 h-20 mx-auto" />
        </div>
        {navItems.map(({ to, icon, label, end }) => (
            <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors font-semibold ${
                        isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-white'
                    }`
                }
            >
                <img src={icon} alt="" className="w-6 h-6" />
                <span>{label}</span>
            </NavLink>
        ))}
    </aside>
);

export default Sidebar;