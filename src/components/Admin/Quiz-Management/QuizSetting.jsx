import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const QuizSetting = ({ props }) => {
    const handleSubmit = () => {

    }
    return (
        <div>
            <h2>Thêm quiz mới</h2>
            <Formik
                initialValues={{
                    title: '',
                    explaination: '',
                    difficulty: '',
                    major: '',
                    duration: '',
                }}
                validationSchema={{
                    
                }}
                onSubmit={handleSubmit()}
            >
                <Form>
                    <div className='mb-4'>
                        <label htmlFor="title">Tiêu đề: </label>
                        <Field
                            id='title'
                            type='text'
                            name='title'
                            // className=
                        ></Field>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default QuizSetting
