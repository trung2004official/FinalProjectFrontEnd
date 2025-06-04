import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/quiztech_logo.svg';

const Header = () => {
    return (
        <header className="bg-CetaceanBlue px-10 flex justify-between items-center">
            <img src={logo} alt="QuizTech Logo" className="h-25 ml-4" />
            <nav className="flex items-center space-x-8 mr-10">
                <ul className="flex space-x-6 text-white">
                    <li className="hover:text-CetaceanBlue-light transition duration-200">
                        <Link to="/" className="flex items-center space-x-2">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="hover:text-CetaceanBlue-light transition duration-200">
                        <Link to="/quiz" className="flex items-center space-x-2">
                            <span>Quiz</span>
                        </Link>
                    </li>
                </ul>
                <Link to="/user" className="flex items-center">
                    <i className="fa-regular fa-user-circle text-white text-2xl hover:text-CetaceanBlue-light transition duration-200"></i>
                </Link>
            </nav>
        </header>
    );
};

export default Header;