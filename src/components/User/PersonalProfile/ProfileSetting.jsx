import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { useUser } from '../../../contexts/UserContext';
import axios from 'axios';
import { BASE_URL } from '../../../../services/api';
import Swal from 'sweetalert2';
const ProfileSetting = ({setShowProfileModal}) => {
    const {user, setUser} = useUser();

    const handleClickConfirm = (values) => {
        Swal.fire({
            title: `Xác nhận lưu thông tin?`,
            icon: 'question',
            showDenyButton: true,
            confirmButtonText: "Xác nhận",
            denyButtonText: `Hủy`
        }).then((result)=>{
            if(result.isConfirmed) {
                handleUpdateProfile(values);
            }
        })
    }
    const handleUpdateProfile = async (values) => {

        try {
            const response = await axios.put(`${BASE_URL}/api/auth/${user.id}`,{
                fullname: values.fullname,
                email: values.email,
                address: values.address,
                phone: values.phone,
            });
            if(response.status === 200) {
                Swal.fire(
                    'Successful',
                    'Đã cập nhật thông tin cá nhân.',
                    'success',
                );
                setUser((prev) => ({...prev, 
                    fullname: response.data.user.fullname,
                    email: response.data.user.email,
                    address: response.data.user.address,
                    phone: response.data.user.phone,
                }))
            }
        } catch (error) {
            console.error('Server error: ', error);
        } finally {
            setShowProfileModal(false);
        }
    }
    return (
        <div>
            <div className="bg-CetaceanBlue-light p-6 rounded-lg text-white z-60">
                <Formik
                    initialValues={{
                        fullname: user.fullname,
                        address: user.address,
                        phone: user.phone,
                        email: user.email,
                    }}
                    validationSchema={Yup.object({
                        fullname: Yup.string().required('Không được để trống'),
                        email: Yup.string().email('Không đúng định dạng email'),
                    })}
                    onSubmit={handleClickConfirm}
                >
                    <Form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className='col-span-2'>
                                <label htmlFor="fullname" className="block mb-1">Họ và Tên</label>
                                <Field name="fullname" type="text" id="fullname" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                                <ErrorMessage name="fullname" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div className='col-span-2'>
                                <label htmlFor="email" className="block mb-1">Email</label>
                                <Field name="email" type="text" id="email" className="w-full h-14 p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                             <div className='col-span-2'>
                                <label htmlFor="address" className="block mb-1">Địa chỉ</label>
                                <Field name="address" type="text" id="address" className="w-full h-14 p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                            </div>

                             <div className='col-span-2'>
                                <label htmlFor="phone" className="block mb-1">Số điện thoại</label>
                                <Field name="phone" type="text" id="phone" className="w-full h-14 p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="mt-4 bg-CetaceanBlue hover:bg-CetaceanBlue-dark px-4 py-2 rounded text-white font-semibold cursor-pointer"
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default ProfileSetting
