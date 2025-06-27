import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { BASE_URL } from '../../../../services/api'
import Swal from 'sweetalert2'

const QuestionSetting = ({ questions, setQuestions, setShowModal, setNewQuestion, handleAddQuestionToQuiz, editingQuestion, answersData }) => {
    const handleAddAnswer = async (questionId, answers, correctAnswer) => {
        try {
            const answerList = answers.map((ans, index) => ({
                content: ans.text,
                isCorrect: index === correctAnswer,
            }));

            for (const answer of answerList) {
                await axios.post(`${BASE_URL}/api/answers/add-answer/${questionId}`, {
                    question_id: questionId,
                    content: answer.content,
                    isCorrect: answer.isCorrect,
                });
            }
        } catch (error) {
            console.error('Lỗi khi tạo câu hỏi mới: ', error);
            Swal.fire(
                "Error",
                "Lỗi khi tạo câu hỏi mới",
                "error"
            );
        } finally {
            setShowModal(false);
        }
    }

    const handleAddNewQuestion = async (values) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/questions/add-question`, {
                content: values.content,
                major: values.major,
                explaination: values.explaination,
                difficulty: values.difficulty,
            });
            console.log('Câu hỏi vừa thêm: ', response.data);
            if (response.status === 200) {
                Swal.fire(
                    'Successful',
                    'Thêm sản phẩm mới thành công',
                    'success'
                );
                if (setQuestions && questions) {
                    setQuestions([...questions, response.data.question]);
                }
                if (setNewQuestion) {
                    setNewQuestion(response.data.question);
                }
                const questionId = response.data.question.id;
                await handleAddAnswer(questionId, values.answers, values.correctAnswer);
                if (handleAddQuestionToQuiz) {
                    handleAddQuestionToQuiz(response.data.question);
                }
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
        } finally {
            setShowModal(false);
        }
    }

    const handleUpdateAnswer = async (answerID, content, correctAnswer) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/answers/update-answer/${answerID}`, {
                content,
                is_correct: correctAnswer
            });
            console.log('Đáp án đã cập nhật: ', response.data);
            if (response.status === 200) {
                Swal.fire(
                    'Successful',
                    'Cập nhật đáp án thành công',
                    'success'
                );
            } else {
                Swal.fire(
                    "Error",
                    "Cập nhật đáp án thất bại",
                    "error"
                );
            }
        } catch (error) {
            console.error('Lỗi server khi cập nhật đáp án: ', error);
            Swal.fire(
                "Error",
                "Lỗi Server",
                "error"
            );
        }
    }

    const handleUpdateQuestion = async (values) => {
        try {
            const response = await axios.put(`${BASE_URL}/api/questions/update-question/${editingQuestion.id}`, {
                content: values.content,
                major: values.major,
                explaination: values.explaination,
                difficulty: values.difficulty,
            });
            console.log('Câu hỏi đã cập nhật: ', response.data);
            if (response.status === 200) {
                Swal.fire(
                    'Successful',
                    'Cập nhật câu hỏi thành công',
                    'success'
                );
                setQuestions(questions.map(q => q.id === editingQuestion.id ? response.data.updatedQuestion : q));
                // Cập nhật đáp án
                for (let i = 0; i < values.answers.length; i++) {
                    const answer = values.answers[i];
                    const answerId = answersData && answersData[i] ? answersData[i].id : undefined;
                    if (answerId) {
                        await handleUpdateAnswer(answerId, answer.text, values.correctAnswer === i);
                    }
                }
                if (handleAddQuestionToQuiz) {
                    handleAddQuestionToQuiz(response.data.question);
                }
            } else {
                Swal.fire(
                    "Error",
                    "Cập nhật câu hỏi thất bại",
                    "error"
                );
            }
        } catch (error) {
            console.error('Lỗi server khi cập nhật câu hỏi: ', error);
            Swal.fire(
                "Error",
                "Lỗi Server",
                "error"
            );
        }
        finally {
            setShowModal(false);
        }
    };

    return (
        <div className="bg-CetaceanBlue-light p-6 rounded-lg text-white z-60">

            <Formik
                initialValues={{
                    content: editingQuestion ? editingQuestion.content : '',
                    major: editingQuestion ? editingQuestion.major : '',
                    explaination: editingQuestion ? editingQuestion.explaination : '',
                    difficulty: editingQuestion ? editingQuestion.difficulty : '',
                    answers: editingQuestion && Array.isArray(answersData) && answersData.length === 4
                        ? answersData.map(ans => ({ text: ans.content }))
                        : [
                            { text: '' },
                            { text: '' },
                            { text: '' },
                            { text: '' }
                        ],
                    correctAnswer: editingQuestion && Array.isArray(answersData) && answersData.length === 4
                        ? answersData.findIndex(ans => ans.is_correct)
                        : 0,
                }}
                validationSchema={Yup.object({
                    content: Yup.string().required('Yêu cầu nhập nội dung'),
                    difficulty: Yup.string()
                        .required('Yêu cầu chọn độ khó')
                        .oneOf(['Gà mờ', 'Cứng tay', 'Đỉnh kout', 'Trùm cuối'], 'Độ khó không hợp lệ'),
                    major: Yup.string()
                        .required('Yêu cầu chọn chuyên ngành')
                        .oneOf(['Thiết Kế Web', 'Mobile', 'Mạng Máy Tính'], 'Chuyên ngành không hợp lệ'),
                    explaination: Yup.string(),
                    answers: Yup.array()
                        .of(Yup.object({ text: Yup.string().required('Không được để trống đáp án') }))
                        .min(4, 'Cần đủ 4 đáp án'),
                    correctAnswer: Yup.number().min(0).max(3).required('Chọn đáp án đúng')
                })}
                onSubmit={values => {
                    if (editingQuestion) {
                        handleUpdateQuestion(values);
                    } else {
                        handleAddNewQuestion(values);
                    }
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className='col-span-2'>
                                <label htmlFor="content" className="block mb-1">Nội dung câu hỏi</label>
                                <Field name="content" type="text" id="content" className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer" />
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
                            <div className="col-span-2 grid gap-4">
                                <label className="block mb-1">Đáp án</label>
                                <FieldArray name="answers">
                                    {() => (<>
                                        {values.answers.map((answer, index) => (<>
                                            <div key={index} className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="correctAnswer"
                                                    checked={values.correctAnswer === index}
                                                    onChange={() => setFieldValue('correctAnswer', index)}
                                                    className="accent-green-500 w-6 h-6 cursor-pointer"
                                                />
                                                <Field
                                                    name={`answers[${index}].text`}
                                                    type="text"
                                                    placeholder={`Đáp án ${index + 1}`}
                                                    className="w-full p-2 rounded bg-PurpleNavy-light text-white cursor-pointer"
                                                />
                                            </div>
                                            <ErrorMessage key={index + 2} name={`answers[${index}].text`} component="div" className="text-red-500 text-center text-sm mt-1" />
                                        </>
                                        ))}</>)}
                                </FieldArray>

                                <ErrorMessage name="correctAnswer" component="div" className="text-red-500 text-sm mt-1" />
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
                    </Form>)}
            </Formik>
        </div>
    )
}

export default QuestionSetting
