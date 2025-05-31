import React from 'react'
import Logo from '../../assets/quiztech_logo.svg'
import '../../css/main.css'
import quizIcon from '../../assets/quiz-icon.svg'
import ItemContainer from './Menu-Items/ItemContainer'
const Sidebar = () => {
  return (
    <>
      <aside className='sidebar'>
        <div className='logo-sidebar-container border-b-4 border-white'>
            <img className='w-[80px] h-[80px]' src={Logo} alt="" />
        </div>
        <ItemContainer logo={quizIcon} title={"Quiz"}/>
      </aside>
    </>
  )
}

export default Sidebar
