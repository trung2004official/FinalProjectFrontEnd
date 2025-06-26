import React, { useState } from 'react';
import QuizCard from './QuizCard.jsx';
import ReactPaginate from 'react-paginate';

const Quizzes = ({ filteredQuizzes, major }) => {
    // Lọc quiz theo major nếu có, nếu không thì lấy tất cả
    const quizzesByMajor = major
        ? filteredQuizzes.filter(quiz => quiz.major === major && quiz.status === 'public')
        : filteredQuizzes.filter(quiz => quiz.status === 'public');

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 3;
    const endOffset = itemOffset + itemsPerPage;
    const currentQuizzes = quizzesByMajor.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(quizzesByMajor.length / itemsPerPage);

    const handlePageClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % quizzesByMajor.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <div className="flex-grow border-t-2 border-CetaceanBlue"></div>
                    <h2 className="mx-4 text-2xl text-CetaceanBlue font-bold text-center whitespace-nowrap">
                        {major ? major : "Tất cả bộ đề"}
                    </h2>
                    <div className="flex-grow border-t-2 border-CetaceanBlue"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {currentQuizzes.map((quiz) => (
                        <QuizCard
                            key={quiz.id}
                            id={quiz.id}
                            title={quiz.title}
                            duration={quiz.duration}
                            difficulty={quiz.difficulty}
                            major={quiz.major}
                        />
                    ))}
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    renderOnZeroPageCount={null}
                    containerClassName="flex justify-center items-center space-x-2 mt-4"
                    pageClassName="border rounded-md py-1 hover:bg-gray-700"
                    pageLinkClassName="text-white cursor-pointer px-3 py-2"
                    activeClassName="bg-CetaceanBlue text-white"    
                    previousClassName="border rounded-md px-3 py-1 hover:bg-gray-700 cursor-pointer"
                    nextClassName="border rounded-md px-3 py-1 hover:bg-gray-700 cursor-pointer"
                    breakClassName="px-3 py-1"
                />
            </div>
        </div>
    );
};

export default Quizzes;