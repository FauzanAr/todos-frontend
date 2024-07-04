import React from 'react'

interface DeleteTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDeleteStatus: () => void;
}

const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({isOpen, onClose, onDeleteStatus }) => {

    const handleConfirmDelete = () => {
        onDeleteStatus();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg sm:w-1/2 lg:w-1/3">
                <p className="text-lg font-semibold mb-4">Are you sure you want to delete this task?</p>
                <div className="flex justify-end">
                    <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none mr-4"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                        onClick={handleConfirmDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTodoModal