import React, { useState } from 'react';

const AccountManagement = () => {
    const [accounts, setAccounts] = useState([
        { id: 1, username: 'user1', email: 'user1@example.com', role: 'Sinh viên', status: 'Hoạt động' },
        { id: 2, username: 'admin1', email: 'admin1@example.com', role: 'Quản trị viên', status: 'Hoạt động' },
    ]);

    const addAccount = () => {
        setAccounts([...accounts, {
            id: accounts.length + 1,
            username: `user${accounts.length + 1}`,
            email: `user${accounts.length + 1}@example.com`,
            role: 'Sinh viên',
            status: 'Hoạt động'
        }]);
    };

    const editAccount = (id, newUsername, newEmail, newRole) => {
        setAccounts(accounts.map(acc =>
            acc.id === id ? { ...acc, username: newUsername, email: newEmail, role: newRole } : acc
        ));
    };

    const toggleAccountStatus = (id) => {
        setAccounts(accounts.map(acc =>
            acc.id === id ? { ...acc, status: acc.status === 'Hoạt động' ? 'Khóa' : 'Hoạt động' } : acc
        ));
    };

    const deleteAccount = (id) => {
        setAccounts(accounts.filter(acc => acc.id !== id));
    };

    return (
        <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
            <div className='flex justify-between mb-4'>
                <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Quản lý tài khoản</h2>
                <button
                    className="bg-CetaceanBlue hover:bg-CetaceanBlue-light text-white px-4 py-2 rounded-lg mb-4"
                    onClick={addAccount}
                >
                    Thêm tài khoản
                </button>
            </div>
            <table className="w-full text-left bg-CetaceanBlue rounded-lg">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="p-2">Tên đăng nhập</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Vai trò</th>
                    <th className="p-2">Trạng thái</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody className='bg-CetaceanBlue-light'>
                {accounts.map(acc => (
                    <tr key={acc.id} className="border-b border-gray-700">
                        <td className="p-2">{acc.username}</td>
                        <td className="p-2">{acc.email}</td>
                        <td className="p-2">{acc.role}</td>
                        <td className="p-2">{acc.status}</td>
                        <td className="p-2">
                            <button
                                className="text-blue-400 hover:underline mr-2"
                                onClick={() => editAccount(
                                    acc.id,
                                    prompt('Tên đăng nhập mới:', acc.username),
                                    prompt('Email mới:', acc.email),
                                    prompt('Vai trò mới:', acc.role)
                                )}
                            >
                                Sửa
                            </button>
                            <button
                                className="text-yellow-400 hover:underline mr-2"
                                onClick={() => toggleAccountStatus(acc.id)}
                            >
                                {acc.status === 'Hoạt động' ? 'Khóa' : 'Mở'}
                            </button>
                            <button
                                className="text-red-400 hover:underline"
                                onClick={() => deleteAccount(acc.id)}
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountManagement;