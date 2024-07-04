import React, { useState } from 'react';

interface UpdateStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateStatus: (newStatus: 'TODO' | 'INPROG' | 'DONE') => void;
}

const UpdateStatusModal: React.FC<UpdateStatusModalProps> = ({ isOpen, onClose, onUpdateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState<'TODO' | 'INPROG' | 'DONE'>('TODO');

    const handleUpdateStatus = () => {
        onUpdateStatus(selectedStatus);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h3 className="text-lg font-semibold">Update Status</h3>
                <div className="mt-2 space-y-2">
                    <button
                        className={`w-full px-3 py-2 rounded-md ${
                            selectedStatus === 'TODO' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => setSelectedStatus('TODO')}
                    >
                        TODO
                    </button>
                    <button
                        className={`w-full px-3 py-2 rounded-md ${
                            selectedStatus === 'INPROG' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => setSelectedStatus('INPROG')}
                    >
                        INPROG
                    </button>
                    <button
                        className={`w-full px-3 py-2 rounded-md ${
                            selectedStatus === 'DONE' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => setSelectedStatus('DONE')}
                    >
                        DONE
                    </button>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                            onClick={handleUpdateStatus}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStatusModal;
