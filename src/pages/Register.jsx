import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SideImage from '../components/Log-Res/SideImage.jsx';
import logo from '../assets/quiztech_logo.svg';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../../services/api.jsx';
import Swal from 'sweetalert2';

const Register = () => {
    const [user, setUser] = useState();

    const handleRegister = async (values) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/register`,{
                username: values.username,
                password: values.password,
                email: values.email,
                rePassword: values.rePassword,
            });
            console.log(response.data);
            if (response.status === 200) {
                Swal.fire(`Đăng ký tài khoản mới thành công`, 'Bạn đã tạo tài khoản mới', 'success');
            }
        } catch (error) {
            console.error('Server error: ', error);
            Swal.fire(`Đăng ký tài khoản mới thất bại`, 'Lỗi đăng ký tài khoản', 'error');
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-CadetBlue">
            <div className="flex w-full h-screen">
                <SideImage />
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-md bg-CetaceanBlue p-8 rounded-lg shadow-lg border border-Manatee">
                        <img src={logo} alt="Logo" className="h-24 mx-auto mb-4" />
                        <p className="text-4xl font-bold text-white text-center mb-6">
                            Welcome to QuizTech
                        </p>
                        <Formik
                            initialValues={{
                                username: '',
                                password: '',
                                email: '',
                                rePassword: '',
                            }}
                            validationSchema={Yup.object({
                                username: Yup.string().required('Yêu cầu nhập tài khoản'),
                                password: Yup.string().required('Yêu cầu nhập mật khẩu'),
                                email: Yup.string().email('Email không hợp lệ').required('Yêu cầu nhập email'),
                                rePassword: Yup.string().required('Yêu cầu nhập lại mật khẩu'),
                            })}
                            onSubmit={handleRegister}
                        >
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-Grey-light mb-2">Tên người dùng</label>
                                    <Field
                                        id="username"
                                        type="text"
                                        className="w-full px-4 py-2 border border-Manatee rounded-lg focus:outline-none focus:ring-2 focus:ring-PurpleNavy bg-white text-black placeholder-Manatee"
                                        placeholder="Nhập tên người dùng"
                                        name = 'username'
                                    />
                                    <ErrorMessage name='username' className='text-red-500 font-bold' component={'span'}/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-Grey-light mb-2">Email</label>
                                    <Field
                                        id="email"
                                        name='email'
                                        type="email"
                                        className="w-full px-4 py-2 border border-Manatee rounded-lg focus:outline-none focus:ring-2 focus:ring-PurpleNavy bg-white text-black placeholder-Manatee"
                                        placeholder="Nhập email"
                                    />
                                    <ErrorMessage name='email' className='text-red-500 font-bold' component={'span'}/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-Grey-light mb-2">Mật khẩu</label>
                                    <Field
                                        id="password"
                                        name='password'
                                        type="password"
                                        className="w-full px-4 py-2 border border-Manatee rounded-lg focus:outline-none focus:ring-2 focus:ring-PurpleNavy bg-white text-black placeholder-Manatee"
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <ErrorMessage name='password' className='text-red-500 font-bold' component={'span'}/>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="confirm-password" className="block text-Grey-light mb-2">Xác nhận mật khẩu</label>
                                    <Field
                                        id="confirm-password"
                                        name='rePassword'
                                        type="password"
                                        className="w-full px-4 py-2 border border-Manatee rounded-lg focus:outline-none focus:ring-2 focus:ring-PurpleNavy bg-white text-black placeholder-Manatee"
                                        placeholder="Xác nhận mật khẩu"
                                    />
                                    <ErrorMessage name='rePassword' className='text-red-500 font-bold' component={'span'}/>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-CetaceanBlue-light text-white py-2 rounded-lg hover:bg-CetaceanBlue-dark focus:outline-none focus:ring-2 focus:ring-CetaceanBlue-light transition duration-200"
                                >
                                    Đăng ký
                                </button>
                            </Form>
                        </Formik>
                        <p className="text-Grey-light mt-6 text-center">
                            Đã có tài khoản?{" "}
                            <Link to="/login" className="text-CadetBlue hover:underline">
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
