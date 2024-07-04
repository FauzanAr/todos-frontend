import React, { useEffect, useState } from 'react';
import api from '../api';
import TodoCard from './TodoCard';
import TodoModal, { TodoFormData } from './TodoModal';
import moment from 'moment';

export interface Task {
    id: number;
    ownerId: number;
    assignToId: number;
    title: string;
    description: string;
    status: 'TODO' | 'INPROG' | 'DONE';
    dueAt: string;
    updatedAt: string;
    createdAt: string;
    Comments: {
        id: number;
        todoId: number;
        comment: string;
        userId: number;
        updatedAt: string;
        createdAt: string;
    }[];
}

const Main = () => {
    const [todoTask, setTodoTask] = useState<Task[]>([])
    const [inprogTask, setInprogTask] = useState<Task[]>([])
    const [doneTask, setDoneTask] = useState<Task[]>([])
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

    const fetchTodoByStatus = async (status: string) => {
        try {
            const result = await api.get(`/task/${status}`);
            return result.data
        } catch (error) {
            console.log(`Status: ${status}, Error: ${error}`);
            return []
        }
    }
    

    const fetchData = async () => {
        try {
            const [todoData, inprogData, doneData] = await Promise.all([
                fetchTodoByStatus('TODO'),
                fetchTodoByStatus('INPROG'),
                fetchTodoByStatus('DONE'),
            ]);

            setTodoTask(todoData);
            setInprogTask(inprogData);
            setDoneTask(doneData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const renderTasks = (tasks: Task[], status: 'TODO' | 'INPROG' | 'DONE') => {
        return (
            <div className="bg-white p-3 shadow rounded">
                <div key={status} className="mt-2">
                <h3 className="text-lg font-semibold">
                    {status === 'TODO' ? 'To Do' : status === 'INPROG' ? 'In Progress' : 'Done'}
                </h3>
                <div className="mt-2 space-y-4">
                    {tasks.map(task => (
                        <TodoCard key={task.id} task={task} fetchData={fetchData} />
                    ))}
                </div>
            </div>
            </div>
        );
    };

    const handleCreateOpenClick = () => {
        setIsModalCreateOpen(true);
    }

    const handleCreateCloseClick = () => {
        setIsModalCreateOpen(false);
    }

    const handleCreateTask = async (data: TodoFormData) => {
        try {
            data.assignToId = Number(data.assignToId);
            data.dueDate = moment(data.dueDate).toISOString();

            await api.post('/task', data);

            await fetchData();
        } catch (error) {
            console.log('error while create task: ', error)
        }

        setIsModalCreateOpen(false);
    }

    useEffect(() => {

        fetchData();

    }, [])
    return (
        <div className="mt-4 flex flex-col space-y-4">
            <div className="grid lg:grid-cols-3 gap-4">
                {renderTasks(todoTask, 'TODO')}
                {renderTasks(inprogTask, 'INPROG')}
                {renderTasks(doneTask, 'DONE')}
            </div>
            <div>
                <div className="bg-white p-4 shadow rounded mt-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                        onClick={handleCreateOpenClick}
                    >
                        Create Task
                    </button>
                </div>
            </div>

            <TodoModal
                isOpen={isModalCreateOpen}
                onClose={handleCreateCloseClick}
                onAction={handleCreateTask}
                type='CREATE'
            />

        </div>
    );
};

export default Main;