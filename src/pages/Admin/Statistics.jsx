import React, { useEffect, useState } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Statistics = () => {
    // State cho từng nhóm thống kê
    const [userStats, setUserStats] = useState({
        total: 0,
        admin: 0,
        user: 0,
        active7d: 0,
        active30d: 0,
        new7d: 0,
        new30d: 0,
        roleRatio: [],
        newUserByDate: [],
    });
    const [quizStats, setQuizStats] = useState({
        total: 0,
        byMajor: [],
        mostPopular: null,
        completionRate: 0,
    });
    const [questionStats, setQuestionStats] = useState({
        byMajor: [],
        hardest: null,
        correctRatio: 0,
    });

    useEffect(() => {
        // Thay thế các hàm giả lập này bằng API 
        const fetchUserStats = async () => {
            setUserStats({
                total: 100,
                admin: 5,
                user: 95,
                active7d: 40,
                active30d: 70,
                new7d: 10,
                new30d: 25,
                roleRatio: [
                    { role: 'admin', count: 5 },
                    { role: 'user', count: 95 }
                ],
                newUserByDate: [
                    { date: '2024-06-18', count: 2 },
                    { date: '2024-06-19', count: 1 },
                    { date: '2024-06-20', count: 3 },
                    { date: '2024-06-21', count: 2 },
                    { date: '2024-06-22', count: 1 },
                    { date: '2024-06-23', count: 1 },
                    { date: '2024-06-24', count: 0 }
                ]
            });
        };
        const fetchQuizStats = async () => {
            setQuizStats({
                total: 42,
                byMajor: [
                    { major: 'Thiết Kế Web', count: 15 },
                    { major: 'Mobile', count: 12 },
                    { major: 'Mạng Máy Tính', count: 15 }
                ],
                mostPopular: { name: 'Quiz 1', attempts: 50 },
                completionRate: 80
            });
        };
        const fetchQuestionStats = async () => {
            setQuestionStats({
                byMajor: [
                    { major: 'Thiết Kế Web', count: 60 },
                    { major: 'Mobile', count: 50 },
                    { major: 'Mạng Máy Tính', count: 46 }
                ],
                hardest: { content: 'Câu hỏi khó nhất', wrongRate: 90 },
                correctRatio: 65
            });
        };

        fetchUserStats();
        fetchQuizStats();
        fetchQuestionStats();
    }, []);


    // Biểu đồ đường người dùng mới theo ngày
    const newUserLineData = {
        labels: userStats.newUserByDate.map(d => d.date),
        datasets: [{
            label: 'Người dùng mới',
            data: userStats.newUserByDate.map(d => d.count),
            fill: false,
            borderColor: '#36A2EB',
            tension: 0.1
        }]
    };

    // Biểu đồ cột số quiz theo chuyên ngành
    const quizBarData = {
        labels: quizStats.byMajor.map(m => m.major),
        datasets: [{
            label: 'Số bài thi',
            data: quizStats.byMajor.map(m => m.count),
            backgroundColor: '#36A2EB'
        }]
    };


    // Biểu đồ cột số câu hỏi theo chuyên ngành
    const questionBarData = {
        labels: questionStats.byMajor.map(m => m.major),
        datasets: [{
            label: 'Số câu hỏi',
            data: questionStats.byMajor.map(m => m.count),
            backgroundColor: '#FF6384'
        }]
    };

    return (
        <div className="space-y-8">
            {/* Thống kê người dùng */}
            <section>
                <h2 className="text-xl font-bold mb-2">Thống kê người dùng</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Tổng số người dùng</div>
                        <div className="text-2xl font-bold">{userStats.total}</div>
                    </div>
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Admin</div>
                        <div className="text-2xl font-bold">{userStats.admin}</div>
                    </div>
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">User</div>
                        <div className="text-2xl font-bold">{userStats.user}</div>
                    </div>
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Hoạt động 30 ngày</div>
                        <div className="text-2xl font-bold">{userStats.active30d}</div>
                    </div>
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Mới 7 ngày</div>
                        <div className="text-2xl font-bold">{userStats.new7d}</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Line
                            data={newUserLineData}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#fff', // màu chữ của legend
                                        }
                                    },
                                    tooltip: {
                                        bodyColor: '#fff', // màu chữ tooltip
                                        titleColor: '#fff'
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: { color: '#fff' }, // màu chữ trục X
                                        grid: { color: '#444' }
                                    },
                                    y: {
                                        ticks: { color: '#fff' }, // màu chữ trục Y
                                        grid: { color: '#444' }
                                    }
                                }
                            }}
                        />
                        <div className="text-center mt-2">Người dùng mới theo ngày</div>
                    </div>
                </div>
            </section>

            {/* Thống kê bài thi */}
            <section>
                <h2 className="text-xl font-bold mb-2">Thống kê bài thi</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Tổng số bài thi</div>
                        <div className="text-2xl font-bold">{quizStats.total}</div>
                    </div>
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Bài thi phổ biến nhất</div>
                        <div className="text-2xl font-bold">{quizStats.mostPopular?.name}</div>
                        <div className="text-sm">Lượt làm: {quizStats.mostPopular?.attempts}</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Bar
                            data={quizBarData}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#fff', // màu chữ của legend
                                        }
                                    },
                                    tooltip: {
                                        bodyColor: '#fff', // màu chữ tooltip
                                        titleColor: '#fff'
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: { color: '#fff' }, // màu chữ trục X
                                        grid: { color: '#444' }
                                    },
                                    y: {
                                        ticks: { color: '#fff' }, // màu chữ trục Y
                                        grid: { color: '#444' }
                                    }
                                }
                            }}
                        />
                        <div className="text-center mt-2">Số bài thi theo chuyên ngành</div>
                    </div>
                </div>
            </section>

            {/* Thống kê câu hỏi */}
            <section>
                <h2 className="text-xl font-bold mb-2">Thống kê câu hỏi</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Tổng số câu hỏi</div>
                        <div className="text-2xl font-bold">
                            {questionStats.byMajor.reduce((sum, item) => sum + item.count, 0)}
                        </div>
                    </div>
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Tỷ lệ đúng</div>
                        <div className="text-2xl font-bold">{questionStats.correctRatio}%</div>
                    </div>
                    <div className="bg-CetaceanBlue-dark p-4 rounded-lg">
                        <div className="font-semibold">Câu hỏi khó nhất</div>
                        <div className="text-2xl font-bold">{questionStats.hardest?.content}</div>
                        <div className="text-sm">Tỷ lệ sai: {questionStats.hardest?.wrongRate}%</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Bar
                            data={questionBarData}
                            options={{
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: '#fff', // màu chữ của legend
                                        }
                                    },
                                    tooltip: {
                                        bodyColor: '#fff', // màu chữ tooltip
                                        titleColor: '#fff'
                                    }
                                },
                                scales: {
                                    x: {
                                        ticks: { color: '#fff' }, // màu chữ trục X
                                        grid: { color: '#444' }
                                    },
                                    y: {
                                        ticks: { color: '#fff' }, // màu chữ trục Y
                                        grid: { color: '#444' }
                                    }
                                }
                            }}
                        />
                        <div className="text-center mt-2">Số câu hỏi theo chuyên ngành</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Statistics;