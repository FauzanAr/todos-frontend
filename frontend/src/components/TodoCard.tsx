import React, { useState } from 'react'
import { Task } from './Todo'
import moment from 'moment'
import UpdateStatusModal from './UpdateStatusTodoModal';
import api from '../api';
import DeleteTodoModal from './DeleteTodoModal';
import TodoModal, { TodoFormData } from './TodoModal';

interface TodoCardProps {
    task: Task;
    fetchData: () => void;
}


const TodoCard = ({task, fetchData}: TodoCardProps) => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user || "");

    const { id, ownerId, assignToId, title, description, status, dueAt } = task;

    const canEdit = ownerId === userData?.id;
    const canUpdateStatus = assignToId === userData?.id && status !== 'DONE';
    const canDelete = ownerId === userData?.id;

    
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalUpdateStatusOpen, setIsModalUpdateStatusOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [updateData, setUpdateData] = useState<TodoFormData>({
        description,
        dueDate: dueAt,
        title,
        assignToId: userData?.id
    });

    // Update Todo
    const handleUpdateOpenClick = () => {
        setIsModalUpdateOpen(true)
    };

    const handleUpdateCloseClick = () => {
        setIsModalUpdateOpen(false)
    };

    const handleEditTodo = async (data: TodoFormData) => {
        try {
            data.assignToId = Number(data.assignToId);
            data.dueDate = moment(data.dueDate).toISOString();

            await api.put(`/task/${id}`, data)

            fetchData();
        } catch (error) {
            console.log('error edit todo: ', error)

        }

        setIsModalUpdateOpen(false)
    };

    // Update status Todo
    const handleUpdateStatusOpenClick = () => {
        setIsModalUpdateStatusOpen(true);
    };

    const handleUpdateStatusCloseClick = () => {
        setIsModalUpdateStatusOpen(false);
    };

    const handleUpdateStatus = async (status: string) => {
        try {
            const body = {
                status
            }
            await api.put(`/task/status/${id}`, body)

            fetchData()
        } catch (error) {
            console.log('Error: ', error)
        }
        setIsModalUpdateStatusOpen(false);
    }

    // Delete Todo
    const handleDeleteOpenClick = () => {
        console.log('clicked')
        setIsModalDeleteOpen(true);
    };

    const handleDeleteCloseClick = () => {
        setIsModalDeleteOpen(false);
    };

    const handleDeleteTodo = async () => {
        try {
            await api.delete(`/task/${id}`)

            fetchData()
        } catch (error) {
            console.log('Error: ', error)
        }

        setIsModalDeleteOpen(false);
    };

    return (
        <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
            <p className="text-xs text-gray-500">Due Date: {moment(dueAt).calendar()}</p>
            <div className="mt-4 flex justify-between items-center">
                {canEdit && (
                    <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        onClick={handleUpdateOpenClick}
                    >
                        Edit
                    </button>
                )}
                {canUpdateStatus && (
                    <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                        onClick={handleUpdateStatusOpenClick}
                    >
                        Update Status
                    </button>
                )}
                {canDelete && (
                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                        onClick={handleDeleteOpenClick}
                    >
                        Delete
                    </button>
                )}
            </div>

            <TodoModal
                isOpen={isModalUpdateOpen}
                onClose={handleUpdateCloseClick}
                onAction={handleEditTodo}
                type='UPDATE'
                data={updateData}
            />

            <UpdateStatusModal
                isOpen={isModalUpdateStatusOpen}
                onClose={handleUpdateStatusCloseClick}
                onUpdateStatus={handleUpdateStatus}
            />

            <DeleteTodoModal
                isOpen={isModalDeleteOpen}
                onClose={handleDeleteCloseClick}
                onDeleteStatus={handleDeleteTodo}
            />

        </div>
    )
}

export default TodoCard