import React from 'react';
import CourseCard from './CourseCard';

const Courses = () => {
    const categories = [
        {
            name: 'Thiết Kế Web',
            courses: [
                { title: 'HTML & CSS Cơ Bản', duration: 30, difficulty: 'Cơ bản', category: 'Thiết Kế Web' },
                { title: 'JavaScript Nâng Cao', duration: 60, difficulty: 'Nâng cao', category: 'Thiết Kế Web' },
                { title: 'React Framework', duration: 45, difficulty: 'Trung cấp', category: 'Thiết Kế Web' },
            ],
        },
        {
            name: 'Mobile',
            courses: [
                { title: 'Android Cơ Bản', duration: 40, difficulty: 'Cơ bản', category: 'Mobile' },
                { title: 'iOS với Swift', duration: 50, difficulty: 'Trung cấp', category: 'Mobile' },
                { title: 'Flutter Development', duration: 60, difficulty: 'Nâng cao', category: 'Mobile' },
            ],
        },
        {
            name: 'Mạng Máy Tính',
            courses: [
                { title: 'CCNA Cơ Bản', duration: 60, difficulty: 'Cơ bản', category: 'Mạng Máy Tính' },
                { title: 'Bảo Mật Mạng', duration: 75, difficulty: 'Nâng cao', category: 'Mạng Máy Tính' },
                { title: 'Quản Trị Hệ Thống', duration: 50, difficulty: 'Trung cấp', category: 'Mạng Máy Tính' },
            ],
        },
    ];

    return (
        <div className="container mx-auto p-6">
            {categories.map((category, index) => (
                <div key={index} className="mb-8">
                    <h2 className="text-2xl text-white font-bold mb-4">{category.name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {category.courses.map((course, idx) => (
                            <CourseCard
                                key={idx}
                                title={course.title}
                                duration={course.duration}
                                difficulty={course.difficulty}
                                category={course.category}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Courses;