import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-CetaceanBlue text-white p-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold">QuizTech</h3>
                    <p className="text-Manatee">© 2025 QuizTech. All rights reserved.</p>
                </div>
                <div className="mb-4 md:mb-0">
                    <h4 className="text-md font-semibold">Liên Hệ</h4>
                    <p className="text-Manatee">Email: support@quiztech.com</p>
                    <p className="text-Manatee">Phone: +84 123 456 789</p>
                </div>
                <div>
                    <h4 className="text-md font-semibold">Theo Dõi Chúng Tôi</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-CetaceanBlue-light hover:text-CetaceanBlue transition duration-200">Facebook</a>
                        <a href="#" className="text-CetaceanBlue-light hover:text-CetaceanBlue transition duration-200">Twitter</a>
                        <a href="#" className="text-CetaceanBlue-light hover:text-CetaceanBlue transition duration-200">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;