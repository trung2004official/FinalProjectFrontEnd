import React from 'react'
import { useUser } from '../../../contexts/UserContext'

const ProfileMain = ({setShowProfileModal}) => {
    const {user} = useUser();
    return (
        <div className="text-CetaceanBlue-dark grid grid-cols-2 p-6 gap-4">
            <div>
                <label htmlFor="fullname">Họ và tên</label>
                <input
                    id="fullname"
                    className='w-full h-15 p-2 rounded bg-PurpleNavy-light  cursor-pointer'
                    value={user? user.fullname : ''}
                    readOnly
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    className='w-full h-15 p-2 rounded bg-PurpleNavy-light  cursor-pointer'
                    value={user? user.email : ''}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="address">Địa chỉ</label>
                <input
                    id="address"
                    className='w-full h-15 p-2 rounded bg-PurpleNavy-light  cursor-pointer'
                    value={user? user.address : ''}
                    readOnly
                />
            </div>
            <div className=''>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                    id="phone"
                    className='w-full h-15 p-2 rounded bg-PurpleNavy-light  cursor-pointer'
                    value={user? user.phone : ''}
                    readOnly
                />
            </div>
            <button className='bg-CetaceanBlue hover:bg-CetaceanBlue-dark px-4 py-2 h-15 rounded text-white font-semibold cursor-pointer col-span-2' onClick={()=>setShowProfileModal(true)}>Chỉnh sửa tài khoản</button>
        </div>
    )
}

export default ProfileMain