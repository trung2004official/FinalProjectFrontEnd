import React from 'react'

const Header = () => {
    return (
        <header className='flex justify-between'>
            <div className='logo'>QuizTech</div>
            <nav className='flex justify-between'>
                <ul>
                    <li>Home</li>
                    <li>Quiz</li>
                </ul>
                <input type="text" placeholder='Search in site' />
            </nav>
        </header>
    )
}

export default Header
