import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/quiztech_logo.svg';

const navItems = [
    { to: '/admin', icon: <i className="fa-solid fa-chart-simple"></i>, label: 'Thống kê', end: true },
    { to: '/admin/quizzes', icon: <i className="fa-regular fa-file-lines"></i>, label: 'Đề thi' },
    { to: '/admin/questions', icon: <i className="fa-regular fa-rectangle-list"></i>, label: 'Câu hỏi' },
    { to: '/admin/accounts', icon: <i className="fa-regular fa-address-card"></i>, label: 'Tài khoản' },
    { to: '/admin/feedback', icon: <i className="fa-regular fa-comment-dots"></i>, label: 'Phản hồi' },
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
                <span className="text-xl">{icon}</span>
                <span>{label}</span>
            </NavLink>
        ))}
    </aside>
);

export default Sidebar;