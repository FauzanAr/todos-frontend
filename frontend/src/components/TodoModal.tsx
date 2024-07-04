import moment from 'moment';
import React, { useEffect, useState } from 'react'
import api from '../api';

interface TodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAction: (data: TodoFormData) => void;
    type: 'CREATE' | 'UPDATE';
    data?: TodoFormData
}

export interface TodoFormData {
    assignToId: number;
    title: string;
    description: string;
    status?: 'TODO' | 'INPROG' | 'DONE';
    dueDate: string;
}

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onAction, onClose, type, data }) => {
    const [formData, setFormData] = useState<TodoFormData>({
        assignToId: data?.assignToId || 0,
        title: data?.title || '',
        description: data?.description || '',
        dueDate: moment(data?.dueDate).format('YYYY-MM-DD HH:mm:ss') || moment().format('YYYY-MM-DD HH:mm:ss'),
    });
    const [users, setUsers] = useState<any[]>([]);

    const fetchUser = async () => {
        try {
            const user = await api.get('/user');
            setUsers(user.data);
        } catch (error) {
            console.log('error while fetch user: ', error)
            return []
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAction = () => {
        onAction(formData);
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <h2 className="text-lg font-semibold mb-4">{type === 'CREATE' ? 'Create New Task' : 'Update Task'}</h2>
                <div className="mb-4">
                    <label htmlFor="assignToId" className="block text-sm font-medium text-gray-700 mb-1">User</label>
                    <select
                        id="assignToId"
                        name="assignToId"
                        value={formData.assignToId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}{`<${user.email}>`}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                {type === 'CREATE' && (
                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="TODO">TODO</option>
                            <option value="INPROG">INPROG</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </div>
                )}
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date & Time</label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleDateTimeChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={handleAction}
                    >
                        {type === 'CREATE' ? 'Create' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoModal