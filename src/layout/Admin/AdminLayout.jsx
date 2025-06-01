import React from 'react'
import Header from '../../components/Admin/Header'
import Sidebar from '../../components/Admin/Sidebar'
import QuizManagement from '../../pages/QuizManagement'
const AdminLayout = () => {
    return (
        <>
            <div className='w-auto'>
                <Header />
            </div>
            <QuizManagement/>
                      {/* <Sidebar/> */}
        </>
    )
}

export default AdminLayout
