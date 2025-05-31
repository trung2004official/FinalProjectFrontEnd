import React from 'react'
import hamburgerIcon from '../../assets/7504229_hamburger_menu_list_options_icon.svg'
import messageIcon from '../../assets/message.svg'
import bellIcon from '../../assets/bell.svg'
import searchIcon from '../../assets/search.svg'
import '../../css/main.css'
const Navbar = () => {
  return (
    <>
        <nav className='flex justify-between w-full'>
            <div className='hamburger-container'>
                <img src={hamburgerIcon} alt="" />
            </div>
            <div className='input-container'>
                <input type="text" className='form-input' placeholder='Tìm kiếm khóa học'/>
            </div>
            <ul className='notification-list'>
                <li><img src={messageIcon} alt="" /></li>
                <li><img src={bellIcon} alt="" /></li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar