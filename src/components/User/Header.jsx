import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/quiztech_logo.svg';

const Header = () => {
    return (
        <header className="bg-CetaceanBlue px-10 flex justify-between items-center">
            <Link to="/home" className="flex items-center space-x-2">
                <img src={logo} alt="QuizTech Logo" className="h-30 ml-4" />
            </Link>
            <nav className="flex items-center space-x-15 mr-20 text-xl">
                <ul className="flex space-x-15 text-white">
                    <li className="hover:text-CetaceanBlue-light transition duration-200">
                        <Link to="/home" className="flex items-center space-x-2">
                            <span className="">Home</span>
                        </Link>
                    </li>
                    <li className="hover:text-CetaceanBlue-light transition duration-200">
                        <Link to="/quiz" className="flex items-center space-x-2">
                            <span>Quiz</span>
                        </Link>
                    </li>
                </ul>
                <Link to="/user" className="flex items-center">
                    <i className="fa-regular fa-user-circle text-white text-3xl hover:text-CetaceanBlue-light transition duration-200"></i>
                </Link>
            </nav>
        </header>
    );
};

export default Header;