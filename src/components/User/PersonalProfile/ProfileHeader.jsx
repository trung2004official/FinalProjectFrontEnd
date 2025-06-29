import React from 'react'
import { useUser } from '../../../contexts/UserContext'

const ProfileHeader = () => {
  const {user} = useUser();
  return (
    <div className='bg-CetaceanBlue-light h-35 flex items-center p-4 mb-10'>
      <h1 className='text-3xl font-bold text-white'>Welcome {user? user.fullname : 'Tên người dùng'}</h1>
    </div>
  )
}

export default ProfileHeader
