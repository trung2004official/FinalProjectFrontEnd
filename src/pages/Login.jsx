import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SideImage from '../components/Log-Res/SideImage.jsx';
import logo from '../assets/quiztech_logo.svg';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '../../services/api.jsx';
import axios from 'axios';
import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useUser } from '../contexts/UserContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        username: values.username,
        password: values.password,
      });
      console.log('Đăng nhập thành công: ', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setUser(response.data.user);
      const decodedToken = jwtDecode(token);
      if (response.status === 200) {
        Swal.fire(
          "Đăng nhập thành công",
          "Bạn đã đăng nhập vào hệ thống",
          "success"
        );
        console.log('Người dùng: ', response.data.user.fullname);
        if (decodedToken.role === 'user') {
          navigate('/home');
        } else if (decodedToken.role === 'admin') {
          navigate('/admin');
        }
      }
    } catch (error) {
      console.error('Server Error: ', error);
      Swal.fire(
        "Đăng nhập thất bại",
        "Thông tin đăng nhập không đúng",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
      <div className="min-h-screen w-full flex bg-CadetBlue">
        <div className="flex w-full h-screen">
          <SideImage />
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-600">
              <img src={logo} alt="Logo" className="h-24 mx-auto mb-4" />
              <p className="text-4xl font-bold text-white text-center mb-6">Welcome to QuizTech</p>
              <Formik
                  initialValues={{
                    username: '',
                    password: '',
                  }}
                  validationSchema={Yup.object({
                    username: Yup.string().required('Yêu cầu nhập tài khoản'),
                    password: Yup.string().required('Vui lòng nhập mật khẩu'),
                  })}
                  onSubmit={handleSubmit}
              >
                <Form>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-400 mb-2">Tên đăng nhập</label>
                    <Field
                        id="username"
                        type="text"
                        name="username"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-3 focus:ring-CetaceanBlue-dark bg-gray-700 text-white placeholder-gray-400 mb-3"
                        placeholder="Nhập tên đăng nhập"
                    />
                    <ErrorMessage name="username" className="font-bold text-red-500" component="span" />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-400 mb-2">Mật khẩu</label>
                    <Field
                        id="password"
                        type="password"
                        name="password"
                        className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-3 focus:ring-CetaceanBlue-dark bg-gray-700 text-white placeholder-gray-400 mb-3"
                        placeholder="Nhập mật khẩu"
                    />
                    <ErrorMessage name="password" className="font-bold text-red-500" component="span" />
                  </div>
                  <button
                      type="submit"
                      className="w-full bg-CetaceanBlue hover:bg-CetaceanBlue-dark text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 hover:cursor-pointer"
                  >
                    Đăng nhập
                  </button>
                </Form>
              </Formik>
              <p className="text-center text-gray-400 mt-4">
                Chưa có tài khoản? <Link to="/register" className="text-PurpleNavy hover:underline hover:text-white">Đăng ký</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;