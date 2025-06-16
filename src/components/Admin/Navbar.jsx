import React from 'react';
import hamburgerIcon from '../../assets/7504229_hamburger_menu_list_options_icon.svg';
import messageIcon from '../../assets/message.svg';
import bellIcon from '../../assets/bell.svg';

const Navbar = () => (
    <nav className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
            <img src={hamburgerIcon} alt="Menu" className="w-6 h-6 cursor-pointer" />
            <input
                type="text"
                className="bg-gray-700 text-white rounded-lg p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tìm kiếm khóa học..."
            />
        </div>
        <ul className="flex gap-4">
            <li><img src={messageIcon} alt="Tin nhắn" className="w-6 h-6 cursor-pointer" /></li>
            <li><img src={bellIcon} alt="Thông báo" className="w-6 h-6 cursor-pointer" /></li>
        </ul>
    </nav>
);

export default Navbar;