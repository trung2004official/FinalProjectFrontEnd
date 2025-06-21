import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const QuizSetting = () => {
    const handleSubmit = () => {

    }
    return (
        <div className="bg-CetaceanBlue-light p-6 rounded-lg text-white z-60">

            <Formik
                initialValues={{
                    title: '',
                    explaination: '',
                    difficulty: '',
                    major: '',
                    duration: '',
                    status: '',
                    question_count: '',
                    image: '',
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Yêu cầu nhập tiêu đề'),
                    
                })}
                onSubmit={() => { }}
            >
                <Form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='col-span-2'>
                            <label htmlFor="title" className="block mb-1">Tiêu đề</label>
                            <Field name="title" type="text" id="title" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                        </div>

                        <div className='col-span-2'>
                            <label htmlFor="explaination" className="block mb-1">Mô tả</label>
                            <Field name="explaination" type="text" id="explaination" className="w-full h-14 p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="block mb-1">Độ khó</label>
                            <Field name="difficulty" type="text" id="difficulty" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                        </div>

                        <div>
                            <label htmlFor="major" className="block mb-1">Chuyên ngành</label>
                            <Field name="major" type="text" id="major" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                        </div>

                        <div>
                            <label htmlFor="duration" className="block mb-1">Thời gian làm bài</label>
                            <Field name="duration" type="text" id="duration" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
                        </div>

                        <div>
                            <label htmlFor="image" className="block mb-1">Link ảnh (tùy chọn)</label>
                            <Field name="image" type="file" id="image" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
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

export default QuizSetting
