import React, { useState } from 'react';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Html' },
        { id: 2, name: 'Javascript' },
    ]);

    const addCategory = () => {
        setCategories([...categories, { id: categories.length + 1, name: `Danh mục ${categories.length + 1}` }]);
    };

    const editCategory = (id, newName) => {
        setCategories(categories.map(cat => cat.id === id ? { ...cat, name: newName } : cat));
    };

    const deleteCategory = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
    };

    return (
        <div className="bg-PurpleNavy-light p-6 rounded-lg shadow-lg">
            <div className='flex justify-between mb-4'>
                <h2 className="text-2xl text-CetaceanBlue-dark font-semibold mb-4">Quản lý danh mục</h2>
                <button
                    className="bg-CetaceanBlue hover:bg-CetaceanBlue-dark text-white px-4 py-2 rounded-lg mb-4"
                    onClick={addCategory}
                >
                    Thêm danh mục
                </button>
            </div>
            <table className="w-full text-left bg-CetaceanBlue rounded-lg">
                <thead>
                <tr className="border-b border-gray-600">
                    <th className="p-2">Tên danh mục</th>
                    <th className="p-2">Hành động</th>
                </tr>
                </thead>
                <tbody className='bg-CetaceanBlue-light'>
                {categories.map(cat => (
                    <tr key={cat.id} className="border-b border-gray-700">
                        <td className="p-2">{cat.name}</td>
                        <td className="p-2">
                            <button
                                className="text-blue-400 hover:underline mr-2"
                                onClick={() => editCategory(cat.id, prompt('Tên danh mục mới:', cat.name))}
                            >
                                Sửa
                            </button>
                            <button
                                className="text-red-400 hover:underline"
                                onClick={() => deleteCategory(cat.id)}
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

export default CategoryManagement;