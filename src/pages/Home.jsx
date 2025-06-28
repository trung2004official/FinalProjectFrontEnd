import React from 'react';
import Header from '../components/User/Header.jsx';
import Footer from '../components/User/Footer.jsx';
import Catalog from '../components/User/Content/Catalog.jsx';
import Hero from '../components/User/Content/Hero.jsx';
import FeedBack from '../components/User/Content/FeedBack.jsx';

const Home = () => {
    return (
        <div className="min-h-screen bg-CadetBlue text-white">
            <Header />
            <main className="container mx-auto p-6 ">
                <Hero />
                <Catalog />
                {/* Hiển thị feedback demo ở cuối trang */}
                <div className="mt-12 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-center text-Emerald">Cảm nhận người dùng</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeedBack
                            username="Nguyễn Văn A"
                            avatar="https://i.pravatar.cc/100"
                            date="2025-06-28 14:00"
                            rating={5}
                            text="Bài quiz rất hay, giao diện đẹp và dễ sử dụng!"
                        />
                        <FeedBack
                            username="Ẩn danh"
                            date="2025-06-27 09:30"
                            rating={4}
                            text="Nội dung phong phú, mong có thêm nhiều đề mới."
                        />
                        <FeedBack
                            username="Lê Thị B"
                            avatar="https://i.pravatar.cc/101"
                            date="2025-06-25 18:20"
                            rating={5}
                            text="Tôi rất thích các đề thi ở đây, rất sát thực tế!"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;