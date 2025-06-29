import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/quiztech_logo.svg';
import { FaChevronDown } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../../contexts/UserContext';
import { BASE_URL } from '../../../services/api';

const Header = () => {
    // const [username, setUsername] = useState('guest'); // Giá trị mặc định
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const {user, setUser} = useUser();
    const token = localStorage.getItem('token');
    const decodedToken =  token? jwtDecode(token) : null;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        Swal.fire(
            "Đã đăng xuất",
            "Bạn đã đăng xuất thành công",
            'success',
        )
        navigate('/');
        console.log(user);
    };

    const handleClickLogOut = () => {
        Swal.fire({
            title: `Bạn chắc chắn muốn đăng xuất?`,
            showDenyButton: true,
            confirmButtonText: "Xác nhận",
            denyButtonText: `Hủy`
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            }
        })
    }

    return (
        <header className="bg-CetaceanBlue px-10 flex justify-between items-center py-4">
            <Link to="/home" className="flex items-center space-x-2">
                <img src={logo} alt="QuizTech Logo" className="h-25 ml-15" />
            </Link>
            <nav className="flex items-center space-x-6 mr-20 text-xl">
                <ul className="flex space-x-6 text-white">
                    <li className="hover:text-CetaceanBlue-light transition duration-200">
                        <Link to="/home" className="flex items-center space-x-2">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className="hover:text-CetaceanBlue-light transition duration-200">
                        <Link to="/quiz" className="flex items-center space-x-2">
                            <span>Quiz</span>
                        </Link>
                    </li>
                </ul>
                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center gap-2 focus:outline-none"
                            onClick={() => setShowDropdown((prev) => !prev)}
                        >   
                            {user.avatar?(
                                <img
                                className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                src={`${BASE_URL}/uploads/${user.avatar}`}
                                alt=""
                                />
                            ) : (
                                <img src='https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/506934082_2095528184291474_2158101689822179965_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG_NK8LCxvnLDBkx2jEV3n-hL9gnEA1UaqEv2CcQDVRql0zFlyR6vScDmIGH_E1LhhYv1t0SgetYcDhlKmDpdIf&_nc_ohc=9fRXLynk1vIQ7kNvwGkR3rN&_nc_oc=AdnbCljaYmk6_VwYamUzq32l-p4q22k2DT9Nb3A8cGYZNhRT5yQfD610BsPMuiG78mI&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=Mfbvo2a5XFI74CMzeQJQ3w&oh=00_AfMhv6b-m-qKHPk5mX2ZbA2WnOkKQk5LmxAULMOsCHartg&oe=68673505'
                                className='w-12 h-12 rounded-full border-2 border-white object-cover'>
                                </img>
                            )}
                            
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-PurpleNavy rounded shadow-lg z-50">
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-CetaceanBlue-light hover:text-white transition"
                                    onClick={() => { setShowDropdown(false); navigate('/profile'); }}
                                >
                                    Thông tin cá nhân
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-CetaceanBlue-light hover:text-white transition"
                                    onClick={() => { setShowDropdown(false); /* navigate('/settings'); */ }}
                                >
                                    Cài đặt
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-CetaceanBlue-light transition"
                                    onClick={() => handleClickLogOut()}
                                >
                                    Đăng xuất
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="text-white px-4 py-2 rounded-lg  hover:text-CetaceanBlue-light transition duration-200"
                        onClick={() => navigate('/login')}
                    >
                        Đăng nhập
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;