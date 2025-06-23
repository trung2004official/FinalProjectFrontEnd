import React from 'react';

const Statistics = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-CetaceanBlue-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Tổng số đề thi</h2>
            <p className="text-3xl font-bold text-CadetBlue">42</p>
        </div>
        <div className="bg-CetaceanBlue-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Tổng số câu hỏi</h2>
            <p className="text-3xl font-bold text-CadetBlue">156</p>
        </div>
        <div className="bg-CetaceanBlue-dark p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Người dùng hoạt động</h2>
            <p className="text-3xl font-bold text-CadetBlue">89</p>
        </div>
    </div>
);

export default Statistics;