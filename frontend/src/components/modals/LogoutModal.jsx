import React from 'react';

function LogoutModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null; // Don't render the modal if it's not open

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Logout</h2>
                <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>

                {/* Modal Actions */}
                <div className="flex justify-center space-x-4">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LogoutModal;
