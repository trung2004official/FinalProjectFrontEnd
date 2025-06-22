import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { BASE_URL } from '../../../../services/api'
import Swal from 'sweetalert2'

const QuestionSetting = ({ questions }) => {
    const handleAddNewQuestion = async (values) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/questions/add-question`, {
                content: values.content,
                major: values.major,
                explaination: values.explaination,
                difficulty: values.difficulty,
            });
            console.log('Câu hỏi vừa thêm: ', response.data);
            questions.push(response.data.question)
            if (response.status === 200) {
                Swal.fire(
                    'Successful',
                    'Thêm sản phẩm mới thành công',
                    'success'
                );
            } else {
                    Swal.fire(
                        "Error",
                        "Thêm sản phẩm thất bại",
                        "error"
                    );
            }
        } catch (error) {
            console.error('Lỗi server khi thêm câu hỏi: ', error);
            if (error.status === 409) {
                Swal.fire(
                    "Error",
                    "Đã có câu hỏi này trong hệ thống",
                    "error"
                );
            } else {
                Swal.fire(
                    "Error",
                    "Lỗi Server",
                    "error"
                );
            }
        }
    }

    return (
        <div className="bg-CetaceanBlue-light p-6 rounded-lg text-white z-60">

            <Formik
                initialValues={{
                    content: '',
                    major: '',
                    explaination: '',
                    difficulty: '',
                }}
                validationSchema={Yup.object({
                    content: Yup.string().required('Yêu cầu nhập nội dung'),
                    difficulty: Yup.string()
                        .required('Yêu cầu chọn độ khó')
                        .oneOf(['Gà mờ', 'Cứng tay', 'Đỉnh kout', 'Trùm cuối'], 'Độ khó không hợp lệ'),
                    major: Yup.string()
                        .required('Yêu cầu chọn chuyên ngành')
                        .oneOf(['Thiết Kế Web', 'Mobile', 'Mạng Máy Tính'], 'Chuyên ngành không hợp lệ'),
                    explaination: Yup.string()
                })}
                onSubmit={handleAddNewQuestion}
            >
                <Form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='col-span-2'>
                            <label htmlFor="content" className="block mb-1">Nội dung câu hỏi</label>
                            <Field name="content" type="text" id="title" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        <div className='col-span-2'>
                            <label htmlFor="explaination" className="block mb-1">Mô tả</label>
                            <Field name="explaination" type="text" id="explaination" className="w-full h-14 p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                            <ErrorMessage name="explaination" component="div" className="text-red-500 text-sm mt-1" />
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

export default QuestionSetting
