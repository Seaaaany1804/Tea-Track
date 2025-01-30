import React from "react";

function DeleteItemModal({ isOpen, closeModal, item, handleDelete }) {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-xl font-bold text-[#14463A] mb-4">
            Delete Item
          </h2>
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete <span className="font-semibold">{item?.name}</span>?
          </p>

          <div className="flex justify-between mt-7">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleDelete(item?.id); // This will trigger the delete action for the item
                closeModal(); // Close the modal after confirming
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteItemModal;
