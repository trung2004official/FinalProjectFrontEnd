import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Header = () => {
  return (
    <header className='flex'>
      <Sidebar/>
      <Navbar/>
    </header>
  )
}

export default Header
