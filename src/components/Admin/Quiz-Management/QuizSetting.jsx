import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../../../../services/api';
import Swal from 'sweetalert2';

const QuizSetting = ({setShowModal, quizzes, setQuizzes}) => {
    const handleAddQuiz = async (values) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/quizzes/create-quiz`, {
                title: values.title,
                duration: values.duration,
                difficulty: values.difficulty,
                major: values.major,
            });
            console.log(response.data);
            if (response.status === 201) {
                Swal.fire(
                    'Successful',
                    'Thêm Quiz mới thành công',
                    'success',
                );
                setQuizzes([...quizzes, response.data.quiz]);
            }
        } catch(error) {
            console.error('Lỗi khi thêm quiz mới: ', error);
            Swal.fire(
                'Lỗi Server',
                'Không thể thêm quiz mới',
                'error',
            );
        } finally {
            setShowModal(false);
        }
    }

    return (
        <div className="bg-CetaceanBlue-light p-6 rounded-lg text-white z-60">
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    difficulty: '',
                    major: '',
                    duration: '',
                    image: '',
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Yêu cầu nhập tiêu đề'),
                    difficulty: Yup.string()
                        .required('Yêu cầu chọn độ khó')
                        .oneOf(['Gà mờ', 'Cứng tay', 'Đỉnh kout', 'Trùm cuối'], 'Độ khó không hợp lệ'),
                    major: Yup.string()
                        .required('Yêu cầu chọn chuyên ngành')
                        .oneOf(['Thiết Kế Web', 'Mobile', 'Mạng Máy Tính'], 'Chuyên ngành không hợp lệ'),
                    description: Yup.string(),
                    duration: Yup.string().required('Nhập thời gian làm bài'),
                    image: Yup.mixed(),
                })}
                onSubmit={handleAddQuiz}
            >
                <Form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='col-span-2'>
                            <label htmlFor="title" className="block mb-1">Tiêu đề</label>
                            <Field name="title" type="text" id="title" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className='col-span-2'>
                            <label htmlFor="description" className="block mb-1">Mô tả</label>
                            <Field name="description" type="text" id="description" className="w-full h-14 p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="block mb-1">Độ khó</label>
                            <Field as="select" name="difficulty" id="difficulty" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer">
                                <option value="" disabled>Chọn độ khó</option>
                                <option value="Gà mờ">Gà mờ</option>
                                <option value="Cứng tay">Cứng tay</option>
                                <option value="Đỉnh kout">Đỉnh kout</option>
                                <option value="Trùm cuối">Trùm cuối</option>
                            </Field>
                            <ErrorMessage name="difficulty" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label htmlFor="major" className="block mb-1">Chuyên ngành</label>
                            <Field as="select" name="major" id="major" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer">
                                <option value="" disabled>Chọn chuyên ngành</option>
                                <option value="Thiết Kế Web">Thiết Kế Web</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Mạng Máy Tính">Mạng Máy Tính</option>
                            </Field>
                            <ErrorMessage name="major" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label htmlFor="duration" className="block mb-1">Thời gian làm bài</label>
                            <Field name="duration" type="number" id="duration" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                            <ErrorMessage name="duration" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div>
                            <label htmlFor="image" className="block mb-1">Link ảnh (tùy chọn)</label>
                            <Field name="image" type="file" id="image" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                            <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="mt-4 bg-CetaceanBlue hover:bg-CetaceanBlue-dark px-4 py-2 rounded text-white font-semibold cursor-pointer"
                        >
                            Lưu
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default QuizSetting;